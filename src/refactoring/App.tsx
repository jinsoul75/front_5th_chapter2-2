import { useState } from 'react';
import { CartPage, AdminPage } from './pages';
import { useCoupons, useProducts } from '@/features/cart/hooks';
import { Navigation } from './components';
import { COUPONS, NAVIGATION_TEXT, PRODUCTS } from './constants';


const App = () => {
  const { products, updateProduct, addProduct } = useProducts(PRODUCTS);
  const { coupons, addCoupon } = useCoupons(COUPONS);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
        title={NAVIGATION_TEXT.TITLE}
        toCartText={NAVIGATION_TEXT.BUTTON.TO_CART}
        toAdminText={NAVIGATION_TEXT.BUTTON.TO_ADMIN}
      />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
