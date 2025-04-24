import { ProductCardAddToCartButton } from "./ProductCardAddToCartButton";
import { ProductCardHeader } from "./ProductCardHeader";
import { ProductCardStock } from "./ProductCardStock";
import { ProductCardDiscount } from "./ProductCardDiscount";

interface ProductCardComposition {
  Header: typeof ProductCardHeader;
  Stock: typeof ProductCardStock;
  Discount: typeof ProductCardDiscount;
  AddToCartButton: typeof ProductCardAddToCartButton;
}

interface ProductCardProps {
  children: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> &
  ProductCardComposition = ({ children, ...props }) => {
  return <div className="bg-white p-3 rounded shadow" {...props}>{children}</div>;
};

ProductCard.Header = ProductCardHeader;
ProductCard.Stock = ProductCardStock;
ProductCard.Discount = ProductCardDiscount;
ProductCard.AddToCartButton = ProductCardAddToCartButton;
