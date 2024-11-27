import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import CommonLayout from "./components/common-layout";
import HomePage from "./pages/home";
import NotFound from "./pages/notfound";
import ProfilePage from "./pages/profile";
import Products from "./pages/products";
import CartPage from "./pages/cart";
import OrderDetails from "./pages/orderDetails";
import ProductDetails from "./pages/productDetails";
import OrdersPage from "./pages/ordersPage";

function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="/signin" />;
  }
  function GoToRegister() {
    localStorage.clear();
    return <SignUp />;
  }
  return (
    <Routes>
      <Route path="/signup" element={<GoToRegister />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<CommonLayout />}>
        <Route path="/products" element={<Products />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<HomePage />} />
        <Route path="orderspage" element={<OrdersPage />} />
        <Route path="order/:slug" element={<OrderDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
