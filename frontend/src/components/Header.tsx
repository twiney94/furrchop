import { Flex, IconButton } from "@chakra-ui/react";
import furrChopLogoPurple from "/furrchoppurple.png";
import furrCHopLogoWhite from "/furrchopwhite.svg";
import styles from "./header.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { RootState } from "../stores/app";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  purple?: boolean;
}

export const Header = (props?: Props) => {
  // isLoggedIn state import to check if user is logged in
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <nav className="flex h-12 flex-grow justify-between">
        <img
          src={props?.purple ? furrChopLogoPurple : furrCHopLogoWhite}
          alt="FurrChop"
          className="h-full"
        />
        <Flex className="items-center gap-4 font-light text-black">
          <IconButton
            aria-label="User"
            icon={<AiOutlineUser />}
            onClick={() =>
              isLoggedIn ? navigate("/profile") : navigate("/login")
            }
          />
        </Flex>
      </nav>
    </header>
  );
};
