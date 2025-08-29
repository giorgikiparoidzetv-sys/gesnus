import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const ALLOWED_ORIGINS = new Set<string>([
  "http://localhost:3000",
  "https://gehnffwcsqvhdodqtbtv.lovableproject.com",
]);

const getCorsHeaders = (origin: string) => {
  const allowed = origin && ALLOWED_ORIGINS.has(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : Array.from(ALLOWED_ORIGINS)[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  } as const;
};

serve(async (req) => {
  const originHeader = req.headers.get("origin") || "";
  const trustedOrigin = ALLOWED_ORIGINS.has(originHeader)
    ? originHeader
    : Array.from(ALLOWED_ORIGINS)[0];

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: getCorsHeaders(originHeader) });
  }

  try {
    const { items, customer_email } = await req.json();

    // Validate required data
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Items array is required and cannot be empty" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create line items for Stripe (basic server-side validation)
    const sanitizeText = (s: unknown) => String(s ?? '').slice(0, 100);
    const line_items = items.map((item: any) => {
      const qty = Math.min(Math.max(parseInt(item?.quantity, 10) || 1, 1), 20);
      const priceNumber = Number(item?.price);
      if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        throw new Error("Invalid item price");
      }
      const unit_amount = Math.round(priceNumber * 100);
      if (unit_amount > 5_000_000) { // Max 50,000 GEL per item (safety)
        throw new Error("Item price exceeds allowed limit");
      }
      return {
        price_data: {
          currency: "gel", // Georgian Lari
          product_data: {
            name: sanitizeText(item?.name),
            description: `${sanitizeText(item?.brand || "Premium")} Snus Product`,
          },
          unit_amount,
        },
        quantity: qty,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: customer_email,
      line_items,
      mode: "payment",
      success_url: `${trustedOrigin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${trustedOrigin}/cart`,
      automatic_tax: { enabled: false },
      shipping_address_collection: {
        allowed_countries: ["GE"], // Georgia
      },
      billing_address_collection: "required",
    });

    console.log("Checkout session created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...getCorsHeaders(originHeader), "Content-Type": "application/json" }, 
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error creating checkout session:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to create checkout session",
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...getCorsHeaders(originHeader), "Content-Type": "application/json" } 
      }
    );
  }
});