import { Coupon } from "@/types";
import { formatCurrency, formatDiscountRate } from "@/utils";

interface Props {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

export const CartCoupon = ({ coupons, selectedCoupon, applyCoupon }: Props) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount"
              ? `${formatCurrency(coupon.discountValue)}`
              : `${formatDiscountRate(coupon.discountValue)}`}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${formatCurrency(selectedCoupon.discountValue)}`
            : `${formatDiscountRate(selectedCoupon.discountValue)}`}{" "}
          할인)
        </p>
      )}
    </div>
  );
};
