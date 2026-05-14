import type { APIRoute } from "astro";
import { stripe } from "../../lib/stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const items = body.items;

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No cart items",
        }),
        { status: 400 }
      );
    }

    // Obtener productos reales desde DB
    const ids = items.map((item: any) => item.id);

    const { data: products, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .in("id", ids);

    if (error || !products) {
      return new Response(
        JSON.stringify({
          error: "Products not found",
        }),
        { status: 400 }
      );
    }

    const line_items = products.map((product) => ({
      price_data: {
        currency: "mxn",

        product_data: {
          name: product.title,
        },

        unit_amount: Math.round(Number(product.price) * 100),
      },

      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items,

      success_url:
        "https://www.alianzava.com/gracias?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "https://www.alianzava.com/cart",
    });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        error: "Server error",
      }),
      {
        status: 500,
      }
    );
  }
};