import { CartItem, Coupon, Product } from '../../../types.ts';
import { PageLayout } from '../../components/PageLayout.tsx';
import { useCart } from '../../hooks';
import { CartList } from './components/CartList.tsx';
import { ProductList } from './components/ProductList.tsx';

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
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <PageLayout title="장바구니">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          addToCart={addToCart}
          getMaxDiscount={getMaxDiscount}
          getRemainingStock={getRemainingStock}
        />
        <CartList
          cart={cart}
          getAppliedDiscount={getAppliedDiscount}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          applyCoupon={applyCoupon}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          totalBeforeDiscount={totalBeforeDiscount}
          totalAfterDiscount={totalAfterDiscount}
          totalDiscount={totalDiscount}
        />
      </div>
    </PageLayout>
  );
};
