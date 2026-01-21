import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Token endpoint from Zakeke documentation
const TOKEN_ENDPOINT = 'https://api.zakeke.com/token';

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

    console.log('Zakeke credentials loaded');
    console.log('Client ID:', clientId);
    console.log('Using endpoint:', TOKEN_ENDPOINT);

    // Basic Auth with client_id:secret_key as per OAuth2 spec
    const basicAuth = btoa(`${clientId}:${secretKey}`);

    // Request token using client_credentials grant
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        access_type: 'C2S', // Client to Server for frontend integration
      }),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response body:', responseText.substring(0, 500));

    if (!response.ok) {
      console.error('Zakeke token request failed:', response.status);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to obtain Zakeke token', 
          status: response.status,
          details: responseText.substring(0, 200),
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse JSON response
    const data = JSON.parse(responseText);
    console.log('Token obtained successfully');

    return new Response(
      JSON.stringify({
        access_token: data.access_token || data['access-token'],
        expires_in: data.expires_in,
        token_type: data.token_type,
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
