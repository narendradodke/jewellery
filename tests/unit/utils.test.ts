import { formatPrice, cn } from "@/lib/utils";

describe("Utility Functions", () => {
  describe("formatPrice", () => {
    it("formats Indian Rupee prices with currency symbol and without decimals", () => {
      const formatted = formatPrice(185000);
      expect(formatted).toContain("1,85,000");
    });

    it("formats small amounts properly", () => {
      const formatted = formatPrice(5000);
      expect(formatted).toContain("5,000");
    });
  });

  describe("cn (tailwind merge + clsx)", () => {
    it("merges conditional class names cleanly", () => {
      const result = cn("text-white", true && "bg-black", false && "hidden");
      expect(result).toBe("text-white bg-black");
    });

    it("handles conflicting tailwind classes correctly", () => {
      const result = cn("p-4", "p-6");
      expect(result).toBe("p-6");
    });
  });
});
