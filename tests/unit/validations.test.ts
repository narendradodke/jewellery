import {
  registerSchema,
  loginSchema,
  createOrderSchema,
  reviewSchema,
} from "@/lib/validations";

describe("Zod Validation Schemas", () => {
  describe("registerSchema", () => {
    it("validates correct registration data", () => {
      const valid = {
        name: "Devika Singhania",
        email: "devika@luxora.com",
        password: "secretpassword123",
      };
      expect(registerSchema.safeParse(valid).success).toBe(true);
    });

    it("rejects weak or short password", () => {
      const invalid = {
        name: "Devika",
        email: "devika@luxora.com",
        password: "123",
      };
      expect(registerSchema.safeParse(invalid).success).toBe(false);
    });

    it("rejects invalid email formats", () => {
      const invalid = {
        name: "Devika",
        email: "not-an-email",
        password: "secretpassword123",
      };
      expect(registerSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("validates proper email and password login payload", () => {
      const valid = { email: "patron@luxora.com", password: "mypassword" };
      expect(loginSchema.safeParse(valid).success).toBe(true);
    });
  });

  describe("createOrderSchema", () => {
    it("validates complete order with shipping address and items", () => {
      const order = {
        items: [
          {
            productId: "prod-1",
            productName: "Royal Bloom Ring",
            price: 185000,
            quantity: 1,
            size: "US 6",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
          },
        ],
        shippingAddress: {
          fullName: "Aditya Roy Kapur",
          email: "aditya@luxora.com",
          phone: "9820098200",
          address: "10 Bandra West",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050",
        },
        paymentMethod: "upi" as const,
      };

      expect(createOrderSchema.safeParse(order).success).toBe(true);
    });

    it("fails when cart items are empty", () => {
      const emptyOrder = {
        items: [],
        shippingAddress: {
          fullName: "Aditya",
          email: "aditya@luxora.com",
          phone: "9820098200",
          address: "10 Bandra West",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050",
        },
        paymentMethod: "card" as const,
      };

      expect(createOrderSchema.safeParse(emptyOrder).success).toBe(false);
    });
  });

  describe("reviewSchema", () => {
    it("validates 5-star rating within range 1 to 5", () => {
      const review = {
        productId: "prod-1",
        rating: 5,
        title: "Magnificent Brilliance",
        comment: "The cut and quality are breathtaking.",
      };
      expect(reviewSchema.safeParse(review).success).toBe(true);
    });

    it("rejects rating greater than 5", () => {
      const review = {
        productId: "prod-1",
        rating: 6,
        title: "Invalid",
        comment: "Comment text",
      };
      expect(reviewSchema.safeParse(review).success).toBe(false);
    });
  });
});
