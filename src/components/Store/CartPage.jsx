import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.total);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
  try {
    setLoading(true);

    const response = await fetch(
      "/api/create-checkout-session",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items,
        }),
      }
    );

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="pt-12 pb-20 bg-white min-h-screen">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <a
            href="/store"
            className="inline-flex text-sm text-gray-500 hover:text-black transition mb-8"
          >
            ← Seguir comprando
          </a>

          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-3">
              Tienda AVA
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">Tu carrito</h1>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-10 text-center">
              <h2 className="text-2xl font-bold mb-3">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-8">
                Agrega algún recurso digital para continuar con tu compra.
              </p>

              <a
                href="/store"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition"
              >
                Ir a la tienda
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
              <div className="space-y-5">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-5 rounded-3xl border border-gray-200 bg-white p-5"
                  >
                    <div className="w-24 h-32 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                      {item.cover_url ? (
                        <img
                          src={item.cover_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          Sin portada
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-1">{item.title}</h2>

                      {item.author && (
                        <p className="text-sm text-gray-500 mb-3">
                          por {item.author}
                        </p>
                      )}

                      <p className="font-semibold mb-4">
                        ${Number(item.price).toFixed(2)} MXN
                      </p>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray-500 hover:text-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="rounded-3xl border border-gray-200 bg-gray-50 p-6 h-fit sticky top-28">
                <h2 className="text-2xl font-bold mb-6">Resumen</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Productos</span>
                    <span>{items.length}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Entrega</span>
                    <span>Digital</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${Number(total()).toFixed(2)} MXN</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition mb-4"
                >
                  {loading ? "Redireccionando..." : "Continuar al pago"}
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-sm text-gray-500 hover:text-red-600 transition"
                >
                  Vaciar carrito
                </button>

                <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                  Después de completar tu compra recibirás un enlace único de
                  descarga con vigencia de 3 días.
                </p>
              </aside>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
