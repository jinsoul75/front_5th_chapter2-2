import { CartItem, Product } from "@/types";
import { calculateRemainingStock } from "@/utils";
import { ProductCard } from "./ProductCard";

interface Props {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
}

export const ProductList = ({ cart, products, addToCart }: Props) => {
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
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
