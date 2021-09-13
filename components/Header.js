import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
function Header({ showScrollHead }) {
  return (
    <>
      {showScrollHead && (
        <header className="sticky top-0 z-50 grid grid-cols-3 p-5 transition duration-700 ease-out transform bg-white shadow-md md:px-10">
          {/* logo */}
          <div className="relative flex items-center h-10 my-auto cursor-pointer">
            <Link href="/">
              <Image
                className="rounded-full"
                src="http://localhost:1337/uploads/small_4000_23712fe719.jpg?459520.10000002384"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
              />
            </Link>
          </div>
          {/* search */}
          <div className="flex items-center py-2 rounded-full md:border-2 md:shadow-sm">
            <input
              type="text"
              placeholder="enter search terms"
              className="flex-grow pl-5 text-sm text-gray-400 bg-transparent outline-none"
            />
            <SearchIcon className="hidden h-8 p-2 text-white bg-red-400 rounded-full cursor-pointer md:inline-flex md:mx-2" />
          </div>
          {/* navs */}
          <div className="flex items-center justify-end space-x-5 text-gray-500">
            <p className="hidden cursor-pointer md:inline">Become a host</p>
            <GlobeAltIcon className="h-6 cursor-pointer" />
            <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
              <MenuIcon className="h-6" />
              <UserCircleIcon className="h-6" />
            </div>
          </div>
        </header>
      )}
    </>
  );
}


export default Header;
