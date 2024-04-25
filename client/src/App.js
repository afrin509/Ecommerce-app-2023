import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Policy from "./pages/Policy.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import Private from "./comopnents/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import ResetPassword from "./pages/Auth/ResetPassword.js";
import AdminRoute from "./comopnents/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./pages/user/Orders.js";
import Profile from "./pages/user/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import SearchPage from "./pages/SearchPage.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import Categories from "./pages/Categories.js";
const router = createBrowserRouter([
  {
    path: "/category/:slug",
    element: <CategoryProduct />,
  },
  {
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: "/product/:slug",
    element: <ProductDetailsPage />,
  },
  {
    path: "/Search",
    element: <SearchPage />,
  },
  {
    path: "/dashboard/user",
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
  },
  {
    path: "/dashboard/user/orders",
    element: (
      <Private>
        <Orders />
      </Private>
    ),
  },
  {
    path: "/dashboard/user/profile",
    element: (
      <Private>
        <Profile />
      </Private>
    ),
  },

  {
    path: "/dashboard/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },

  {
    path: "/dashboard/admin/create-product",
    element: (
      <AdminRoute>
        <CreateProduct />
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/admin/product/:slug",
    element: (
      <AdminRoute>
        <UpdateProduct />
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/admin/products",
    element: (
      <AdminRoute>
        <Products />
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/admin/users",
    element: (
      <AdminRoute>
        <Users />
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/admin/create-category",
    element: (
      <AdminRoute>
        <CreateCategory />
      </AdminRoute>
    ),
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/Pagenotfound",
    element: <Pagenotfound />,
  },
  {
    path: "/Policy",
    element: <Policy />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
