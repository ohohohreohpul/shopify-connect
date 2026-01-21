import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Parse request body to get visitorcode if provided
    let visitorCode: string | null = null;
    let customerCode: string | null = null;
    
    try {
      const body = await req.json();
      visitorCode = body.visitorCode || null;
      customerCode = body.customerCode || null;
    } catch {
      // No body or not JSON - generate a visitor code
    }

    // Generate a unique visitor code if not provided (required for C2S tokens)
    if (!visitorCode && !customerCode) {
      visitorCode = `visitor_${crypto.randomUUID()}`;
    }

    console.log('Zakeke credentials loaded');
    console.log('Client ID:', clientId);
    console.log('Visitor Code:', visitorCode);
    console.log('Customer Code:', customerCode);

    // Basic Auth with client_id:secret_key as per Zakeke docs
    const basicAuth = btoa(`${clientId}:${secretKey}`);

    // Build request body with required parameters
    const bodyParams = new URLSearchParams({
      grant_type: 'client_credentials',
      access_type: 'C2S', // Client to Server for UI/iframe integration
    });

    // Add visitor or customer code (required for C2S tokens)
    if (customerCode) {
      bodyParams.append('customercode', customerCode);
    } else if (visitorCode) {
      bodyParams.append('visitorcode', visitorCode);
    }

    console.log('Request body:', bodyParams.toString());

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
        'Accept': 'application/json',
      },
      body: bodyParams,
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
        visitor_code: visitorCode,
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
