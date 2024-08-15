import { Navigate, Route, Routes } from "react-router-dom";

import PlatformLayout from "./layouts/platform-layout";
import AuthLayout from "./layouts/auth-layout";

import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AboutPage from "./pages/about-page";

import { useAuth } from "./providers/auth-provider";
import TeamPage from "./pages/vision-page";
import VisionPage from "./pages/team-page";
import ProductPage from "./pages/products-page";
import NotFoundPage from "./pages/notfound-page";
import ProductDetailsPage from "./pages/product-details-page";
import HomePage from "./pages/home-page";
import ComparePage from "./pages/cart-compare-page";
import UserCartPage from "./pages/user-cart-page";
import LiveCartPage from "./pages/live-cart-page";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();

  // in case the user is still being fetched
  if (loggedInUser === undefined) {
    return null;
  }

  // if the user is not logged in, redirect
  if (loggedInUser === null) {
    return <Navigate to="/auth/login" replace />;
  }

  // if the user is logged in, show the protected route
  return children;
}

// function LiveRoomValidation({ children }: { children: React.ReactNode }) {
//   const { hasLiveCart } = useLiveCart();
//   if (!hasLiveCart) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

function AuthRoutes({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();

  // in case the user is still being fetched
  if (loggedInUser === undefined) {
    return null;
  }

  // if the user is logged in, redirect to home
  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  // if the user is not logged in, show the auth routes
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlatformLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductPage />}>
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="about" element={<AboutPage />}>
          <Route path="vision" element={<VisionPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        {/* <Route path="services" element={<div>Services</div>} /> */}
        {/* Protected Routes */}
        <Route
          path="savedCarts"
          element={
            <ProtectedRoute>
              <UserCartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="compare"
          element={
            <ProtectedRoute>
              <ComparePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="liveCart"
          element={
            // <LiveRoomValidation>
            <LiveCartPage />
            // </LiveRoomValidation>
          }
        />
      </Route>

      {/* Authentication Routes */}
      <Route
        path="auth"
        element={
          <AuthRoutes>
            <AuthLayout />
          </AuthRoutes>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
