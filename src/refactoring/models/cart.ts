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
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { product, quantity } = item;
    const { price } = product;

    totalBeforeDiscount += price * quantity;

    const maxDiscount = getMaxApplicableDiscount(item);
    totalAfterDiscount += price * quantity * (1 - maxDiscount);
  });

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

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
