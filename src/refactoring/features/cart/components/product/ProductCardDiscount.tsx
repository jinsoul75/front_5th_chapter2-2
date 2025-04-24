import { Discount } from "@/types";
import { getMaxDiscount } from "@/utils";

import { formatDiscountRate } from "@/utils";

export const ProductCardDiscount = ({
  discounts
}: {
  discounts: Discount[];
}) => {
  // if 문을 컴포넌트 내부로 두어서 재사용시 외부에서 조건 설정 안해줘도 된다. -> 이게 좋나?
  if (discounts.length === 0) return null;

  return (
    <div>
      <span className="ml-2 font-medium text-blue-600">
        최대 {formatDiscountRate(getMaxDiscount(discounts))} 할인
      </span>
      <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
        {discounts.map((discount, index) => (
          <li key={index}>
            {discount.quantity}개 이상: {formatDiscountRate(discount.rate)} 할인
          </li>
        ))}
      </ul>
    </div>
  );
};
