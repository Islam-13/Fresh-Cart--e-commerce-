import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Layout from "./ui/Layout";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import ProtectedAuthRoutes from "./ui/ProtectedAuthRoutes";
import Loader from "./ui/Loader";
import { Offline } from "react-detect-offline";
import Off from "./ui/Off";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home = lazy(() => import("./pages/Home"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const Brands = lazy(() => import("./pages/Brands"));
const Orders = lazy(() => import("./pages/Orders"));
const NotFound = lazy(() => import("./ui/NotFound"));
const Register = lazy(() => import("./pages/Register"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const VerifyCode = lazy(() => import("./pages/VerifyCode"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Addresses = lazy(() => import("./pages/Addresses"));

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "forget-password",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <ForgetPassword />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "forget-password/verify-code/:mail",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <VerifyCode />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "reset-password",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <ResetPassword />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Wishlist />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Categories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Brands />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Product />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Orders />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "addresses",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Addresses />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 100 } },
  });

  return (
    <>
      <Offline>
        <Off />
      </Offline>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <RouterProvider router={routers}>
              <Layout />
            </RouterProvider>
          </AuthProvider>
          <Toaster
            position="top-center"
            gutter={10}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
            }}
          />
        </HelmetProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
