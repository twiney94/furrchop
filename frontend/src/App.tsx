import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/app";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BaseLayout from "./layouts/BaseLayout";
import SearchPage from "./pages/SearchPage";
import MainLayout from "./layouts/MainLayout";
import BookingPage from "./pages/BookingPage";

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

// Routes structure
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="search" element={<SearchPage />} />
        <Route path="book" element={<BookingPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
