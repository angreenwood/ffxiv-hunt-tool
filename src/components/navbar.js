import React, { useState, useEffect, useRef, useContext } from "react";
import { GiHuntingHorn } from "react-icons/gi";
import './navbar.scss'

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
export default function Example({user}) {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    console.log(user.displayName);
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
      >
        <a href="/" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
      >
        <a href="/huntselection" className="flex items-center">
          Search
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
      >
        <a href="/" className="flex items-center">
          Hunt
        </a>
      </Typography>
      {user ?  <Typography
        as="li"
        variant="small"
      >
        <a href="/characterlink" className="flex items-center">
          Profile
        </a>
      </Typography> : null}
    </ul>
  );
 
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 nav-div">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span className="nav-title"> <GiHuntingHorn size={42} className="horn"/> FFXIV Wiki Docs</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {!user ? <a href="/login" className="flex items-center">
        Sign In
      </a>:  <div className="profile-div">
      <img src={user.photoURL} alt="user_photo" className="user-photo"/>
      <a href="/" className="flex items-center">
      Sign Out
    </a>
      </div>}
        
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
      <MobileNav open={openNav}>
        {navList}
      </MobileNav>
    </Navbar>
  );
}