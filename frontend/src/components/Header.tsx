import { Avatar, Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import furrChopLogoWhite from "/furrchopwhite.svg";
import furrChopLogoPurple from "/furrchoppurple.png";
import styles from "./header.module.css";

const user = {
	name: "Ryan Florence",
	imageUrl: "https://bit.ly/ryan-florence",
};

export const Header = (props: { mode: string }) => {
	const { mode } = props;
	if (mode === "default") {
		return (
			<header className={styles.header}>
				<nav className="flex h-12 flex-grow justify-between">
					<img src={furrChopLogoPurple} alt="FurrChop" className="h-full" />
					<Flex className="items-center gap-4 font-light text-black">
						<NavLink to="/">Home</NavLink>
						<NavLink to="about">About</NavLink>
						<NavLink to="help">Help</NavLink>
						<Button colorScheme="purple" variant="outline">
							Sign Up
						</Button>
						<Avatar name={user.name} src={user.imageUrl} />
					</Flex>
				</nav>
			</header>
		);
	} else {
		return (
			<header>
				<nav className="flex h-12 flex-grow justify-between">
					<img src={furrChopLogoWhite} alt="FurrChop" className="h-full" />
					<Flex className="items-center gap-4 font-light text-white">
						<NavLink to="/">Home</NavLink>
						<NavLink to="about">About</NavLink>
						<NavLink to="help">Help</NavLink>
						<Button colorScheme="teal" variant="outline">
							Sign Up
						</Button>
						<Avatar name={user.name} src={user.imageUrl} />
					</Flex>
				</nav>
			</header>
		);
	}
};
