import { useState } from "react";
import { useCartStore } from "../../stores/cartStore";

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1600);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`
        w-full md:w-auto inline-flex items-center justify-center gap-2
        px-8 py-4 rounded-full font-medium transition-all duration-300
        ${
          added
            ? "bg-green-700 text-white scale-105"
            : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
        }
      `}
    >
      <span>{added ? "Agregado" : "Agregar al carrito"}</span>
      <span className={added ? "translate-x-1 transition" : "transition"}>
        {added ? "✓" : "→"}
      </span>
    </button>
  );
}