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

    console.log('Requesting Zakeke OAuth token with Basic auth...');
    console.log('Client ID length:', clientId.length);

    // Use Basic authentication (recommended by Zakeke docs)
    const basicAuth = btoa(`${clientId}:${secretKey}`);

    const tokenResponse = await fetch('https://api.zakeke.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    const responseText = await tokenResponse.text();
    console.log('Zakeke response status:', tokenResponse.status);
    console.log('Zakeke response:', responseText.substring(0, 200));

    if (!tokenResponse.ok) {
      console.error('Zakeke token request failed:', tokenResponse.status, responseText);
      return new Response(
        JSON.stringify({ error: 'Failed to obtain Zakeke token', details: responseText }),
        { status: tokenResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
