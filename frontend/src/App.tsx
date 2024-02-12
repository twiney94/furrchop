import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BaseLayout from "./layouts/BaseLayout";
import SearchPage from "./pages/SearchPage";
import MainLayout from "./layouts/MainLayout";
import BookingPage from "./pages/BookingPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { UnloggedRoute, ProtectedRoute } from "./components/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";

// Adding Gibson font to Chakra UI
const theme = extendTheme({
  fonts: {
    heading: `'canada-type-gibson', sans-serif`,
    body: `'canada-type-gibson', sans-serif`,
  },
  colors: {
    brand: {
      100: "#e4cbfd",
      200: "#d8b2fc",
      300: "#cc99fb",
      400: "#c080fa",
      500: "#beadfa",
      600: "#b58df9",
      700: "#ac6df8",
      800: "#a34df7",
      900: "#a68cf7",
    },
  },
});

const AuthProviderLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

// Routes structure
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthProviderLayout />}>
      <Route element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="search" element={<SearchPage />} />
        <Route
          path="book"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <UnloggedRoute>
              <AuthPage mode="login" />
            </UnloggedRoute>
          }
        />
        <Route
          path="register"
          element={
            <UnloggedRoute>
              <AuthPage mode="register" />
            </UnloggedRoute>
          }
        />
        <Route path="forgot-password" />
        <Route
          path="activate/:token"
          element={
            <UnloggedRoute>
              <AuthPage mode="activate" />
            </UnloggedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage mode="past-bookings" />
            </ProtectedRoute>
          }
        />
        <Route
          path="me"
          element={
            <ProtectedRoute>
              <ProfilePage mode="me" />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
