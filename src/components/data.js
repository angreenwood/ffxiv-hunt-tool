import React from 'react'
import { FaBlogger, FaRedditSquare, FaBookDead } from 'react-icons/fa'
import { FcWikipedia } from "react-icons/fc";
export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/huntselection',
    text: 'Search',
  },
  {
    id: 3,
    url: '/characterlink',
    text: 'Profile',
  },
  {
    id: 4,
    url: '/login',
    text: 'Sign In',
  },
  
]

export const social = [
  {
    id: 1,
    url: 'https://ffxiv.consolegameswiki.com/wiki/FF14_Wiki',
    icon: <FaBookDead />,
  },
  {
    id: 2,
    url: 'https://eu.finalfantasyxiv.com/blog/',
    icon: <FaBlogger />,
  },
  {
    id: 3,
    url: 'https://www.reddit.com/r/ffxiv/',
    icon: <FaRedditSquare />,
  },
  
  
]