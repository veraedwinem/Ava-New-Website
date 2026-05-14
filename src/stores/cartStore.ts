import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((item) => item.id === product.id);

        if (existing) return;

        set({
          items: [...items, { ...product, quantity: 1 }],
        });
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      total: () => {
        return get().items.reduce(
          (sum, item) => sum + Number(item.price) * item.quantity,
          0
        );
      },
    }),
    {
      name: "ava-cart",
    }
  )
);