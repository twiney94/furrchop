import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import "./mainlayout.module.css";

const MainLayout = () => {
	return (
		<div className="flex flex-col max-h-screen w-screen items-center">
			<div className="p-6">
				<Header mode="default" />
			</div>

			<main className="w-full grow">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
