import { useState } from "react";
import { Product } from "@/types";
import { validateProductData } from "@/utils";
import { ProductAddForm } from "./ProductAddForm";
import { ProductCart } from "./ProductCart";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductSection = ({
  products,
  onProductUpdate,
  onProductAdd
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: []
  });

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };

    const validationErrors = validateProductData(productWithId);

    if (validationErrors.length > 0) {
      alert(validationErrors.map((error) => error.message).join("\n"));
      return;
    }

    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: []
    });
    setShowNewProductForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <ProductAddForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddNewProduct={handleAddNewProduct}
        />
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductCart
            key={product.id}
            products={products}
            product={product}
            index={index}
            onProductUpdate={onProductUpdate}
          />
        ))}
      </div>
    </div>
  );
};
