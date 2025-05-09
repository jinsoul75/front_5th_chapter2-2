import { formatCurrency } from '@/features/cart/utils';

interface Props {
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
}

export const CartTotal = ({
  totalBeforeDiscount,
  totalDiscount,
  totalAfterDiscount,
}: Props) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
      <div className="space-y-1">
        <p>상품 금액: {formatCurrency(totalBeforeDiscount)}</p>
        <p className="text-green-600">할인 금액: {formatCurrency(totalDiscount)}</p>
        <p className="text-xl font-bold">
          최종 결제 금액: {formatCurrency(totalAfterDiscount)}
        </p>
      </div>
    </div>
  );
};
