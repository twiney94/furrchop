import { Avatar, Flex } from "@chakra-ui/react";
import furrChopLogoPurple from "/furrchoppurple.png";
import styles from "./header.module.css";
import { AiOutlineUser } from "react-icons/ai";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className="flex h-12 flex-grow justify-between">
        <img src={furrChopLogoPurple} alt="FurrChop" className="h-full" />
        <Flex className="items-center gap-4 font-light text-black">
          <Avatar bg="brand.500" icon={<AiOutlineUser fontSize="1.5rem" />} />
        </Flex>
      </nav>
    </header>
  );
};
