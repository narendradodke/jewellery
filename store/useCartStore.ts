import { create } from "zustand";
import { Product, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  wishlist: [],

  addItem: (product: Product, quantity = 1, selectedSize) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += quantity;
        return { items: updated };
      }

      return {
        items: [...state.items, { product, quantity, selectedSize: selectedSize || product.sizes?.[0] }],
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: quantity <= 0
        ? state.items.filter((item) => item.product.id !== productId)
        : state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleWishlist: (productId: string) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      return {
        wishlist: exists
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    });
  },

  isInWishlist: (productId: string) => {
    return get().wishlist.includes(productId);
  },

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));
