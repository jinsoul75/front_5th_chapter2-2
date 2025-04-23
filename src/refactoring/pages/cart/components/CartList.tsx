import { CartItem, Coupon } from '../../../../types';
import { useDiscountCalculator } from '../../../hooks/useDiscountCalculator';
import { formatDiscountRate, formatCurrency } from '../../../utils';
import { CartCard } from './CartCard';
import { CartCoupon } from './CartCoupon';
import { CartTotal } from './CartTotal';

interface Props {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
}

export const CartList = ({
  cart,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  coupons,
  selectedCoupon,
}: Props) => {
  const { cartCalculations } = useDiscountCalculator(cart, selectedCoupon);

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = cartCalculations;

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => (
          <CartCard
            key={item.product.id}
            item={item}
            getAppliedDiscount={getAppliedDiscount}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <CartCoupon
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />

      <CartTotal
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
        totalAfterDiscount={totalAfterDiscount}
      />
    </div>
  );
};
