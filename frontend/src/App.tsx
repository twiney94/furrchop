import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BaseLayout from "./layouts/BaseLayout";
import SearchPage from "./pages/SearchPage";
import MainLayout from "./layouts/MainLayout";

// Adding Gibson font to Chakra UI
const theme = extendTheme({
	fonts: {
		heading: `'canada-type-gibson', sans-serif`,
		body: `'canada-type-gibson', sans-serif`,
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
