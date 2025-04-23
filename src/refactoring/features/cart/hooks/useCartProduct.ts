import { CartItem, Product } from "@/types";
import { calculateRemainingStock, getMaxDiscount } from "@/utils";

export const useCartProduct = (product: Product, cart: CartItem[]) => {
  const remainingStock = calculateRemainingStock(product, cart);
  const isOutOfStock = remainingStock <= 0;
  const maxDiscount = getMaxDiscount(product.discounts);

  return {
    remainingStock,
    isOutOfStock,
    maxDiscount
  };
};