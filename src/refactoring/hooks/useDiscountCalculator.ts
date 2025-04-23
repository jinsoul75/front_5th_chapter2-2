import { useMemo } from 'react';
import { CartItem, Coupon } from '../../types';
import { calculateCartTotal } from '../models/cart';

interface UseDiscountCalculatorReturn {
  cartCalculations: {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

// 할인 계산 로직을 분리한 훅
export const useDiscountCalculator = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
): UseDiscountCalculatorReturn => {
  // 장바구니 전체 할인 계산 - cart나 coupon이 변경될 때만 재계산
  const cartCalculations = useMemo(
    () => calculateCartTotal(cart, selectedCoupon),
    [cart, selectedCoupon],
  );

  return {
    cartCalculations,
  };
};
