import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cartStore";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIndicator() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) return null;

  return (
    <a
      href="/cart"
      className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 hover:bg-gray-50 transition"
      aria-label="Ver carrito"
    >
      <span className="text-xl"><FaShoppingCart /></span>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs flex items-center justify-center animate-bounce">
          {count}
        </span>
      )}
    </a>
  );
}