import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    // Create line items for Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "gel", // Georgian Lari
        product_data: {
          name: item.name,
          description: `${item.brand || "Premium"} Snus Product`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to tetri (Georgian cents)
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: customer_email,
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
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
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
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
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});