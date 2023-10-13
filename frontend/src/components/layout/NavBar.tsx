import FurrChopLogo from "@/assets/furrchop.svg?react";
import { Button } from "@/components/ui/button"

interface NavBarProps {}

// NavBar contains a clickable logo on the left side of the navbar, and buttons on the right side.

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
			<div className="flex items-center justify-between select-none">
				<a className="flex items-center " href="/">
					<FurrChopLogo className="h-12" alt="Logo" />
				</a>
				<div className="flex gap-9">
					<button className="btn btn-outline-success">Gift Cards</button>
					<button className="btn btn-outline-success">My Bookings</button>
					<Button variant="outline">Login</Button>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
