import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Try multiple possible token endpoints
const TOKEN_ENDPOINTS = [
  'https://api.zakeke.com/token',
  'https://api.zakeke.com/oauth/token',
  'https://api.zakeke.com/v1/token',
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get('ZAKEKE_CLIENT_ID');
    const secretKey = Deno.env.get('ZAKEKE_SECRET_KEY');

    if (!clientId || !secretKey) {
      console.error('Missing Zakeke credentials');
      return new Response(
        JSON.stringify({ error: 'Zakeke credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Zakeke credentials loaded:');
    console.log('Client ID:', clientId);
    console.log('Secret Key length:', secretKey.length);
    console.log('Secret Key first 5 chars:', secretKey.substring(0, 5));
    console.log('Secret Key last 5 chars:', secretKey.substring(secretKey.length - 5));

    const basicAuth = btoa(`${clientId}:${secretKey}`);
    let lastError = null;
    let lastStatus = 0;

    // Try each endpoint
    for (const endpoint of TOKEN_ENDPOINTS) {
      console.log(`\n=== Trying endpoint: ${endpoint} ===`);

      // Method 1: Basic Auth with S2S access
      try {
        console.log('Trying Basic auth with S2S access...');
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            access_type: 'S2S',
          }),
        });

        const text = await response.text();
        console.log('Response status:', response.status);
        console.log('Response body:', text || '(empty)');
        lastStatus = response.status;

        if (response.ok && text) {
          const data = JSON.parse(text);
          console.log('SUCCESS with Basic auth S2S!');
          return new Response(
            JSON.stringify({
              access_token: data.access_token || data['access-token'],
              expires_in: data.expires_in,
              token_type: data.token_type,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        lastError = text || 'Empty response';
      } catch (e) {
        console.log('Basic auth S2S error:', e);
        lastError = String(e);
      }

      // Method 2: Basic Auth with C2S access (default)
      try {
        console.log('Trying Basic auth with C2S access...');
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }),
        });

        const text = await response.text();
        console.log('Response status:', response.status);
        console.log('Response body:', text || '(empty)');
        lastStatus = response.status;

        if (response.ok && text) {
          const data = JSON.parse(text);
          console.log('SUCCESS with Basic auth C2S!');
          return new Response(
            JSON.stringify({
              access_token: data.access_token || data['access-token'],
              expires_in: data.expires_in,
              token_type: data.token_type,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        lastError = text || 'Empty response';
      } catch (e) {
        console.log('Basic auth C2S error:', e);
        lastError = String(e);
      }

      // Method 3: Body params
      try {
        console.log('Trying body params method...');
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: secretKey,
          }),
        });

        const text = await response.text();
        console.log('Response status:', response.status);
        console.log('Response body:', text || '(empty)');
        lastStatus = response.status;

        if (response.ok && text) {
          const data = JSON.parse(text);
          console.log('SUCCESS with body params!');
          return new Response(
            JSON.stringify({
              access_token: data.access_token || data['access-token'],
              expires_in: data.expires_in,
              token_type: data.token_type,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        lastError = text || 'Empty response';
      } catch (e) {
        console.log('Body params error:', e);
        lastError = String(e);
      }
    }

    // All attempts failed
    return new Response(
      JSON.stringify({ 
        error: 'Failed to obtain Zakeke token from all endpoints', 
        lastStatus,
        details: lastError,
        triedEndpoints: TOKEN_ENDPOINTS,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in zakeke-token function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
