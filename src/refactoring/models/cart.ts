import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;

  const total = price * quantity;
  const maxDiscount = getMaxApplicableDiscount(item);

  const totalAfterDiscount = total * (1 - maxDiscount);

  return totalAfterDiscount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;

  const maxDiscount = discounts.reduce((max, discount) => {
    return quantity >= discount.quantity && discount.rate > max ? discount.rate : max;
  }, 0);

  return maxDiscount;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const discount = selectedCoupon
    ? selectedCoupon.discountType === 'amount'
      ? selectedCoupon.discountValue
      : totalBeforeDiscount * (selectedCoupon.discountValue / 100)
    : cart
        .map((item) => getMaxApplicableDiscount(item))
        .reduce((acc, item) => acc + item, 0);

  const totalDiscount = totalBeforeDiscount * (1 - discount);

  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
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
