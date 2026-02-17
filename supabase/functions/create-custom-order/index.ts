import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderRequest {
  size: string;
  orientation: string;
  material: string;
  addons: string[]; // e.g. ["custom_text", "gold_accents"]
  customText?: string;
  designImageUrl?: string;
  customerEmail?: string;
  customerNote?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: OrderRequest = await req.json();
    const { size, orientation, material, addons = [], customText, designImageUrl, customerEmail, customerNote } = body;

    if (!size || !orientation || !material) {
      return new Response(JSON.stringify({ error: "size, orientation, and material are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch pricing rules from database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: rules, error: rulesError } = await supabase
      .from("pricing_rules")
      .select("category, option_key, price_eur, label")
      .eq("is_active", true);

    if (rulesError) {
      throw new Error(`Failed to fetch pricing rules: ${rulesError.message}`);
    }

    // Calculate price server-side
    const ruleMap = new Map(rules.map((r: any) => [`${r.category}:${r.option_key}`, r]));

    const baseRule = ruleMap.get(`base_size:${size}`);
    if (!baseRule) {
      return new Response(JSON.stringify({ error: `Invalid size: ${size}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let totalPrice = Number(baseRule.price_eur);
    const lineItems: string[] = [`Größe: ${baseRule.label || size}`];

    // Material surcharge
    const materialRule = ruleMap.get(`material:${material}`);
    if (materialRule) {
      totalPrice += Number(materialRule.price_eur);
      lineItems.push(`Material: ${materialRule.label || material} (+€${Number(materialRule.price_eur).toFixed(2)})`);
    }

    lineItems.push(`Format: ${orientation}`);

    // Add-ons
    for (const addon of addons) {
      const addonRule = ruleMap.get(`addon:${addon}`);
      if (addonRule) {
        totalPrice += Number(addonRule.price_eur);
        lineItems.push(`${addonRule.label || addon}: +€${Number(addonRule.price_eur).toFixed(2)}`);
      }
    }

    if (customText) {
      lineItems.push(`Text: "${customText}"`);
    }

    if (designImageUrl) {
      lineItems.push(`Design: ${designImageUrl}`);
    }

    // Create Shopify Draft Order
    const shopifyAccessToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!shopifyAccessToken) {
      throw new Error("SHOPIFY_ACCESS_TOKEN not configured");
    }

    const shopifyDomain = "urban-artery.myshopify.com";
    const draftOrderPayload = {
      draft_order: {
        line_items: [
          {
            title: `Street-Art-Unikat – ${size} ${orientation} ${material}`,
            price: totalPrice.toFixed(2),
            quantity: 1,
            requires_shipping: true,
            properties: lineItems.map((item, i) => ({
              name: `Detail ${i + 1}`,
              value: item,
            })),
          },
        ],
        note: [
          `Konfiguration: ${size} / ${orientation} / ${material}`,
          addons.length > 0 ? `Add-ons: ${addons.join(", ")}` : null,
          customText ? `Kundentext: ${customText}` : null,
          designImageUrl ? `Design-Upload: ${designImageUrl}` : null,
          customerNote ? `Kundennotiz: ${customerNote}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        ...(customerEmail ? { email: customerEmail } : {}),
      },
    };

    const shopifyRes = await fetch(
      `https://${shopifyDomain}/admin/api/2025-07/draft_orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyAccessToken,
        },
        body: JSON.stringify(draftOrderPayload),
      }
    );

    if (!shopifyRes.ok) {
      const errorText = await shopifyRes.text();
      console.error("Shopify Draft Order error:", errorText);
      throw new Error(`Shopify API error: ${shopifyRes.status}`);
    }

    const shopifyData = await shopifyRes.json();
    const draftOrder = shopifyData.draft_order;

    // The invoice_url is the checkout URL for the customer
    const invoiceUrl = draftOrder.invoice_url;

    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: invoiceUrl,
        orderId: draftOrder.id,
        totalPrice: totalPrice.toFixed(2),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating custom order:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
