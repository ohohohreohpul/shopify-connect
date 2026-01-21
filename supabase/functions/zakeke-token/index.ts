import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    console.log('Attempting Zakeke OAuth with body params...');
    console.log('Client ID:', clientId);
    console.log('Secret Key length:', secretKey.length);

    // Try with credentials in body (alternative method per Zakeke docs)
    const tokenResponse = await fetch('https://api.zakeke.com/token', {
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

    const responseText = await tokenResponse.text();
    console.log('Zakeke response status:', tokenResponse.status);
    console.log('Zakeke response headers:', JSON.stringify(Object.fromEntries(tokenResponse.headers.entries())));
    console.log('Zakeke response body:', responseText || '(empty)');

    if (!tokenResponse.ok) {
      // If body method fails, try Basic auth
      console.log('Body method failed, trying Basic auth...');
      const basicAuth = btoa(`${clientId}:${secretKey}`);
      
      const basicResponse = await fetch('https://api.zakeke.com/token', {
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

      const basicText = await basicResponse.text();
      console.log('Basic auth response status:', basicResponse.status);
      console.log('Basic auth response body:', basicText || '(empty)');

      if (!basicResponse.ok) {
        return new Response(
          JSON.stringify({ 
            error: 'Failed to obtain Zakeke token', 
            bodyMethodStatus: tokenResponse.status,
            basicAuthStatus: basicResponse.status,
            details: basicText || responseText || 'Empty response from Zakeke'
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const basicData = JSON.parse(basicText);
      return new Response(
        JSON.stringify({
          access_token: basicData.access_token || basicData['access-token'],
          expires_in: basicData.expires_in,
          token_type: basicData.token_type,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokenData = JSON.parse(responseText);
    console.log('Zakeke token obtained successfully');

    return new Response(
      JSON.stringify({
        access_token: tokenData.access_token || tokenData['access-token'],
        expires_in: tokenData.expires_in,
        token_type: tokenData.token_type,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
