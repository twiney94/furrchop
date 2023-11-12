import { Outlet, NavLink } from "react-router-dom";
import furrChopLogoWhite from "/furrchopwhite.svg";
import { Flex } from "@chakra-ui/react";
import "./baselayout.module.css";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header className="bg-[#B8A2E5]">
        <nav className="flex h-12 m-6 flex-grow justify-between">
          <img src={furrChopLogoWhite} alt="FurrChop" className="h-full" />
          <Flex className="items-center gap-4 font-light text-white">
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About</NavLink>
            <NavLink to="help">Help</NavLink>
          </Flex>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
