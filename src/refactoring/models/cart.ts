import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  return 0;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return 0;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  return {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  const cartItem = cart.find((item) => item.product.id === productId);

  if (!cartItem) {
    return cart;
  }

  const maxQuantity = cartItem.product.stock;
  const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

  return cart
    .map((item) =>
      item.product.id === productId ? { ...item, quantity: updatedQuantity } : item,
    )
    .filter((item) => item.quantity > 0);
};
