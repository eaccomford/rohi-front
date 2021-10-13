import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { loginState, loginData } from '../recoil/atoms';

function Header({ showScrollHead, searchTermValue }) {
  const [loginClicked, setLoginClicked] = useRecoilState(loginState);
  const [loginDataState, setLogindataState] = useRecoilState(loginData);
  const searchTermRef = useRef(null);

  const searchEntered = () => {
    const searchTerm = searchTermRef.current.value;
    searchTermValue(searchTerm);
  };
  return (
    <>
      {showScrollHead && (
        <header className="sticky top-0 z-50 grid grid-cols-3 p-5 transition duration-700 ease-out transform bg-white shadow-md md:px-10">
          {/* logo */}
          <div className="relative flex items-center h-10 my-auto cursor-pointer">
            <Link href="/">
              <div className="xflex">
                <Image
                  className="rounded-full"
                  src="/assets/logo.png"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="left"
                />
                <div className="ml-[40px] hidden md:flex">The Rohi Church</div>
              </div>
            </Link>
          </div>
          {/* navs */}
          <div className="flex items-center py-2">
            <div className="flex items-center justify-center">
              <div className="flex justify-between inline-block w-[500px] p-2 text-center text-gray-800 hidden md:flex">
                <Link href={`/sermons`}>
                  <div className="flex h-3">
                    <div className="mb-2 cursor-pointer hover:border-t-2">
                      About
                    </div>
                  </div>
                </Link>
                <Link href={`/sermons`}>
                  <div className="flex h-3">
                    <div className="mb-2 cursor-pointer hover:border-t-2">
                      Contact
                    </div>
                  </div>
                </Link>
                <Link href={`/sermons`}>
                  <div className="flex h-3">
                    <div className="mb-2 cursor-pointer hover:border-t-2">
                      Sermons
                    </div>
                  </div>
                </Link>
                <Link href={`/sermons`}>
                  <div className="flex h-3">
                    <div className="mb-2 cursor-pointer hover:border-t-2">
                      Events
                    </div>
                  </div>
                </Link>
                <Link href={`/sermons`}>
                  <div className="flex h-3">
                    <div className="mb-2 cursor-pointer hover:border-t-2">
                      Services
                    </div>
                  </div>
                </Link>
                <Link href={`/donation`}>
                  <div className="flex h-3">
                    <div className="mb-2 cursor-pointer hover:border-t-2">
                      Donations
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* navs */}
          <div className="flex justify-end">
            <div className="flex items-center justify-end space-x-5 text-gray-500 rounded-full md:border-2 md:shadow-sm w-[300px] ">
              <input
                ref={searchTermRef}
                type="text"
                placeholder="enter search terms"
                className="flex-grow pl-5 text-sm text-gray-400 bg-transparent outline-none"
                onKeyUp={searchEntered}
              />
              <SearchIcon className="hidden h-8 p-2 text-white bg-red-400 rounded-full cursor-pointer md:inline-flex md:mx-2" />
            </div>
            {/* login status */}
            {loginClicked && (
              <div className="flex items-center justify-end ml-3 space-x-5">
                <p className="hidden cursor-pointer md:inline">
                  {loginDataState?.user?.username}
                </p>
                <div className="ml-1">
                  {loginDataState?.user?.image != null && (
                    <Image
                      className="rounded-full"
                      src={
                        process.env.NEXT_PUBLIC_URL +
                        loginDataState?.user?.image?.url
                      }
                      objectFit="cover"
                      objectPosition="center"
                      objectPosition="center"
                      width="40"
                      height="35"
                    />
                  )}
                </div>
                {/* <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
                  <MenuIcon className="h-6" />
                  <UserCircleIcon className="h-6" />
                </div> */}
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
