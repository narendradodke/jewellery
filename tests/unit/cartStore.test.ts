import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS } from "@/lib/mockData";

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("initializes with an empty cart and wishlist", () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.wishlist).toEqual([]);
    expect(state.getItemCount()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });

  it("adds a product to cart and updates count", () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, 1, "US 6");

    const state = useCartStore.getState();
    expect(state.getItemCount()).toBe(1);
    expect(state.items[0].product.id).toBe(product.id);
    expect(state.items[0].selectedSize).toBe("US 6");
    expect(state.getSubtotal()).toBe(product.price);
  });

  it("increments quantity if adding the same product and size", () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, 1, "US 6");
    useCartStore.getState().addItem(product, 2, "US 6");

    const state = useCartStore.getState();
    expect(state.getItemCount()).toBe(3);
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it("updates item quantity and removes when quantity is zero", () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, 2, "US 6");
    useCartStore.getState().updateQuantity(product.id, 5, "US 6");

    expect(useCartStore.getState().items[0].quantity).toBe(5);

    useCartStore.getState().updateQuantity(product.id, 0, "US 6");
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it("applies privilege voucher correctly", () => {
    const product = PRODUCTS[0]; // price 185000
    useCartStore.getState().addItem(product, 1);

    const result = useCartStore.getState().applyVoucher("LUXORA10");
    expect(result.success).toBe(true);

    const state = useCartStore.getState();
    const discount = state.getDiscount();
    expect(discount).toBe(Math.round(185000 * 0.1));
  });

  it("toggles wishlist status for a product", () => {
    const product = PRODUCTS[0];
    expect(useCartStore.getState().isInWishlist(product.id)).toBe(false);

    useCartStore.getState().toggleWishlist(product.id);
    expect(useCartStore.getState().isInWishlist(product.id)).toBe(true);

    useCartStore.getState().toggleWishlist(product.id);
    expect(useCartStore.getState().isInWishlist(product.id)).toBe(false);
  });
});
