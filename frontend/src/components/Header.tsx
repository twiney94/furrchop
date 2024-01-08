import { Avatar, Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import furrChopLogoWhite from "/furrchopwhite.svg";

const user = {
    name: 'Ryan Florence',
    imageUrl: 'https://bit.ly/ryan-florence',
  }
  

export const Header = () => {
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
};
