import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ProductProvider } from './context/ProductContext';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function NotFoundPlaceholder() {
  return <div className="py-24 text-center text-muted">404 — Page Not Found</div>;
}

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPlaceholder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;