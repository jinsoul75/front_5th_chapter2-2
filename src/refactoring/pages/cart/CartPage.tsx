import { Coupon, Product } from "@/types";
import { PageLayout } from "@/components";
import { useCart } from "@/features/cart/hooks";
import { CartList, ProductList } from "@/features/cart/components/";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    selectedCoupon
  } = useCart();

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
