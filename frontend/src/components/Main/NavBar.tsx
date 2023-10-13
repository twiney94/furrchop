import { ReactComponent as LogoWhite } from "../../assets/furrchopwhite.svg";
import { ReactComponent as Logo } from "../../assets/furrchop.svg";
import { Button } from "flowbite-react";
import { HiMenu } from "react-icons/hi";

const unloggedSections = [
  {
    name: "Gift Cards",
    href: "/giftcards",
  },
  {
    name: "My Bookings",
    href: "/bookings",
  },
];

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="https://flowbite.com" className="flex items-center">
          <Logo className="h-12 select-none" />
        </a>
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {unloggedSections.map((section) => (
                <a
                  key={section.name}
                  href={section.href}
                  className="text-base font-medium text-white"
                >
                  {section.name}
                </a>
              ))}
              <Button
                gradientDuoTone="purpleToPink"
                className="ml-4 text-white flex items-center"
                outline
              >
                Login
                <HiMenu className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
