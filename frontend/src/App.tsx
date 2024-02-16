import './App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BaseLayout from './layouts/BaseLayout';
import SearchPage from './pages/SearchPage';
import MainLayout from './layouts/MainLayout';
import BookingPage from './pages/BookingPage';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';
import { UnloggedRoute, ProtectedRoute } from './components/ProtectedRoute';
import { ProfilePage } from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import { UsersProvider } from './hooks/useUsers';
import { ShopsProvider } from './hooks/useShops';
import { EmployeesProvider } from './hooks/useEmployees';
import { ServicesProvider } from './hooks/useServices';
import { SchedulesProvider } from './hooks/useSchedules';
import { BookingsProvider } from './hooks/useBookings';

// Adding Gibson font to Chakra UI
const theme = extendTheme({
  fonts: {
    heading: `'canada-type-gibson', sans-serif`,
    body: `'canada-type-gibson', sans-serif`,
  },
  colors: {
    brand: {
      100: '#e4cbfd',
      200: '#d8b2fc',
      300: '#cc99fb',
      400: '#c080fa',
      500: '#beadfa',
      600: '#b58df9',
      700: '#ac6df8',
      800: '#a34df7',
      900: '#a68cf7',
    },
  },
});

const AuthProviderLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const AdmminProviderLayout = () => (
  <UsersProvider>
    <ShopsProvider>
      <ServicesProvider>
        <EmployeesProvider>
          <SchedulesProvider>
            <Outlet />
          </SchedulesProvider>
        </EmployeesProvider>
      </ServicesProvider>
    </ShopsProvider>
  </UsersProvider>
);
const BookingProviderLayout = () => (
  <BookingsProvider>
    <Outlet />
  </BookingsProvider>
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
        <Route element={<BookingProviderLayout />}>
          <Route
            path="book/:shopId"
            element={
              <ProtectedRoute>
                <BookingPage mode="landing" />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking/:serviceId"
            element={
              <ProtectedRoute>
                <BookingPage mode="confirmation" />
              </ProtectedRoute>
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
        </Route>
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
          path="me"
          element={
            <ProtectedRoute>
              <ProfilePage mode="me" />
            </ProtectedRoute>
          }
        />
        <Route element={<AdmminProviderLayout />}>
          <Route
            path="admin-panel"
            element={
              <ProtectedRoute>
                <AdminPanelPage />
              </ProtectedRoute>
            }
          />
        </Route>
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
