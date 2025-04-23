import { Coupon, Product } from '../../../types.ts';
import { PageLayout } from '../../components/PageLayout.tsx';
import { useCart } from '../../features/cart/hooks/index.ts';
import { CartList } from '../../features/cart/components/CartList.tsx';
import { ProductList } from '../../features/cart/components/ProductList.tsx';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, selectedCoupon } =
    useCart();

  return (
    <PageLayout title="장바구니">
      <ProductList cart={cart} products={products} addToCart={addToCart} />
      <CartList
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        applyCoupon={applyCoupon}
        coupons={coupons}
        selectedCoupon={selectedCoupon}
      />
    </PageLayout>
  );
};
