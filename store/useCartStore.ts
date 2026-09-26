import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, CartItem } from "@/types";

export interface Voucher {
  code: string;
  discountAmount?: number;
  percentage?: number;
  description: string;
}

const AVAILABLE_VOUCHERS: Record<string, Voucher> = {
  LUXORA10: {
    code: "LUXORA10",
    percentage: 10,
    description: "10% Royal Privilege Savings",
  },
  GOLDEN: {
    code: "GOLDEN",
    discountAmount: 15000,
    description: "₹15,000 Atelier Heirloom Credit",
  },
  ROYAL25: {
    code: "ROYAL25",
    discountAmount: 25000,
    description: "₹25,000 Bridal Suite Courtesy",
  },
};

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  appliedVoucher: Voucher | null;

  // Cart operations
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;

  // Wishlist operations
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Voucher operations
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;

  // Calculations
  getItemCount: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getDiscount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      appliedVoucher: null,

      addItem: (product: Product, quantity = 1, selectedSize) => {
        const targetSize = selectedSize || product.sizes?.[0] || "Standard";

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              (item.selectedSize === targetSize || (!item.selectedSize && !targetSize))
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                selectedSize: targetSize,
              },
            ],
          };
        });
      },

      removeItem: (productId: string, selectedSize?: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                (!selectedSize || item.selectedSize === selectedSize)
              )
          ),
        }));
      },

      updateQuantity: (productId: string, quantity: number, selectedSize?: string) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    (!selectedSize || item.selectedSize === selectedSize)
                  )
              ),
            };
          }

          return {
            items: state.items.map((item) => {
              if (
                item.product.id === productId &&
                (!selectedSize || item.selectedSize === selectedSize)
              ) {
                return { ...item, quantity };
              }
              return item;
            }),
          };
        });
      },

      clearCart: () => set({ items: [], appliedVoucher: null }),

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

      applyVoucher: (code: string) => {
        const cleaned = code.trim().toUpperCase();
        const voucher = AVAILABLE_VOUCHERS[cleaned];
        if (voucher) {
          set({ appliedVoucher: voucher });
          return {
            success: true,
            message: `${voucher.code} applied: ${voucher.description}`,
          };
        }
        return {
          success: false,
          message: "Invalid or expired privilege voucher code.",
        };
      },

      removeVoucher: () => set({ appliedVoucher: null }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 0 ? Math.round(subtotal * 0.03) : 0; // 3% GST
      },

      getDiscount: () => {
        const { appliedVoucher, getSubtotal } = get();
        const subtotal = getSubtotal();
        if (!appliedVoucher || subtotal === 0) return 0;

        if (appliedVoucher.percentage) {
          return Math.round((subtotal * appliedVoucher.percentage) / 100);
        }
        if (appliedVoucher.discountAmount) {
          return Math.min(appliedVoucher.discountAmount, subtotal);
        }
        return 0;
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const discount = get().getDiscount();
        return Math.max(0, subtotal + tax - discount);
      },
    }),
    {
      name: "luxora_cart_storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
        appliedVoucher: state.appliedVoucher,
      }),
    }
  )
);
