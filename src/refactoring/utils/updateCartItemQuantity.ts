import { CartItem } from '../../types';

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
) => {
  return cart.map((item) =>
    item.product.id === productId ? { ...item, quantity: newQuantity } : item,
  );
};
