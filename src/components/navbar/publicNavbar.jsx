import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { GiHuntingHorn } from "react-icons/gi";
import "./navbar.scss";
import { Outlet, Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import OutsideClickHandler from "react-outside-click-handler";
export default function PublicNavbar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const signOutHandler = async () => {
    setOpenNav(false);
    await signOutUser();
    setCurrentUser(null);
    localStorage.removeItem("UID");
  };
  useEffect(() => {
    if (localStorage.getItem("UID")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, [currentUser, loggedIn]);
  const handleLinkClick = () => {
    setOpenNav(false);
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
      >
        <Link
          className="flex items-center"
          to="/"
          onClick={handleLinkClick}
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
      >
        <Link
          to="/huntselection"
          className="flex items-center"
          onClick={handleLinkClick}
        >
          Search
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
      >
        <Link
          to="/hunt"
          className="flex items-center"
          onClick={handleLinkClick}
        >
          Hunt
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
      >
        <Link
          to="/login"
          className="flex items-center"
          onClick={handleLinkClick}
        >
          Sign In
        </Link>
      </Typography>
      <Outlet />
    </ul>
  );

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpenNav(false);
      }}
    >
      <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 nav-div">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span className="nav-title">
              {" "}
              <Link
                to="/"
                className="flex items-center"
                onClick={handleLinkClick}
              >
                <GiHuntingHorn
                  size={42}
                  className="horn"
                />{" "}
                FFXIV Wiki Docs
              </Link>
            </span>
          </Typography>
          <div className="hidden lg:block">{navList}</div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 open-nav text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </OutsideClickHandler>
  );
}
