import { Coupon, Product } from "@/types";
import { PageLayout } from "@/components";
import { CouponSection, ProductSection } from "@/features/admin/components";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd
}: Props) => {
  return (
    <PageLayout title="상품 관리">
      <ProductSection
        products={products}
        onProductUpdate={onProductUpdate}
        onProductAdd={onProductAdd}
      />
      <CouponSection onCouponAdd={onCouponAdd} coupons={coupons} />
    </PageLayout>
  );
};
