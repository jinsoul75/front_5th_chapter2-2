import { CartItem, Product } from '../../../../types';
import { ProductCard } from '../../../components';
import { calculateRemainingStock } from '../../../models/cart';
interface Props {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
}

export const ProductList = ({ cart, products, addToCart }: Props) => {
  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const getRemainingStock = (product: Product) => {
    return calculateRemainingStock(product, cart);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getRemainingStock={getRemainingStock}
            getMaxDiscount={getMaxDiscount}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
