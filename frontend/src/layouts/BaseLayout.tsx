import { Outlet, NavLink } from "react-router-dom";
import furrChopLogoWhite from "/furrchopwhite.svg";
import homePageJumbo from "/homepage-jumbo.png";
import { Flex, Avatar, Button, background } from "@chakra-ui/react";
import "./baselayout.module.css";

const user = {
  name: 'Ryan Florence',
  imageUrl: 'https://bit.ly/ryan-florence',
}

export default function RootLayout() {
  return (
    <div className="pageContainer">
      <div className="jumbo" style={
        {
          backgroundImage: `url(${homePageJumbo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '40vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }>
        <div className="root-layout py-6">
          <header>
            <nav className="flex h-12 flex-grow justify-between">
              <img src={furrChopLogoWhite} alt="FurrChop" className="h-full" />
              <Flex className="items-center gap-4 font-light text-white">
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="help">Help</NavLink>
                <Button colorScheme="teal" variant="outline">Sign Up</Button>
                <Avatar
                  name={user.name}
                  src={user.imageUrl}
                />
              </Flex>
            </nav>
          </header>
        </div>
      </div>
      <div className="content my-8">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
