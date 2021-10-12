import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/Link';
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { loginState, loginData } from '../recoil/atoms';

const Header = ({ showScrollHead }) => {
  const [loginClicked, setLoginClicked] = useRecoilState(loginState);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [loginDataState, setLogindataState] = useRecoilState(loginData);
  const [optionMenuBtn, setOptionMenuBtn] = useState(
    'hover:bg-gray-200 hover:py-5'
  );

  const donation = () => {
    if (showMenuOptions === false) {
      setShowMenuOptions(true);
      setOptionMenuBtn('bg-white shadow-2xl py-3 ml-1 rounded-full');
    } else {
      setShowMenuOptions(false);
      setOptionMenuBtn('hover:bg-gray-200 hover:py-5');
    }
  };
  const turnOffDonation = () => alert('ddd');
  return (
    <>
      {!showScrollHead && (
        <div>
          <header className="sticky top-0 z-50 grid grid-cols-3 p-5 shadow-md bg-white-100/60 md:px-10 backdrop-blur-sm">
            {/* logo */}
            <div className="relative flex items-center h-10 my-auto cursor-pointer">
              <div className="xflex">
                <Image
                  className="rounded-full"
                  src="/assets/logo.png"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="left"
                />
                <div className="ml-[40px] hidden md:flex  text-white">
                  The Rohi Church
                </div>
              </div>
            </div>
            {/* search */}
            <div className="flex items-center justify-center">
              <div className="flex justify-between inline-block w-[500px] p-2 text-center text-white hidden md:flex">
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
            {/* navs */}
            <div className="flex justify-end">
              <div className="flex items-center justify-end space-x-5 text-gray-500 rounded-full md:border-2 md:shadow-sm w-[300px] ">
                <input
                  // ref={searchTermRef}
                  type="text"
                  placeholder="enter search terms"
                  className="flex-grow pl-5 text-sm text-gray-400 bg-transparent outline-none"
                  // onKeyUp={searchEntered}
                />
                <SearchIcon className="hidden h-8 p-2 text-white bg-red-400 rounded-full cursor-pointer md:inline-flex md:mx-2" />
              </div>
              {/* login status */}
              {loginClicked && (
                <div className="flex items-center justify-end ml-3 space-x-5 text-white">
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
          {/* menu options */}
          <div className="relative flex justify-center p-2 mt-3">
            <div className="absolute  flex items-center justify-evenly w-[550px] bg-gray-100/60 rounded-full top-1/3  backdrop-blur-sm shadow-lg">
              <div className="flex-grow px-3 py-5 text-xs border-r-2 sm:text-sm hover:rounded-full hover:bg-gray-200 border-gray-100/60">
                Events
              </div>
              <div className="flex-grow-0 px-3 py-5 text-xs border-r-2 border-gray-100/60 sm:text-sm hover:rounded-full hover:bg-gray-200 hover:ml-1">
                Pastor Meful
              </div>
              <div className="flex-grow-0 px-3 py-5 text-xs border-r-2 border-gray-100/60 sm:text-sm hover:rounded-full hover:bg-gray-200 hover:ml-1">
                Partner
              </div>
              <div
                onClick={donation}
                // onBlur={turnOffDonation}
                className={`flex z-20 items-center justify-between flex-grow px-3 text-xs sm:hover:py-3  sm:text-sm hover:rounded-full  hover:ml-1  ${optionMenuBtn}`}
              >
                <div>Donation</div>
                <SearchIcon className="hidden h-8 p-1 text-white bg-red-400 rounded-full cursor-pointer z-21 md:inline-flex" />
              </div>
            </div>
            {/* donations */}
            {showMenuOptions && (
              <div className="absolute hover:shadow-xl rounded-2xl w-[700px] h-[300px] inline-block bg-gray-100/60 backdrop-blur-sm  top-14 mt-5"></div>
            )}
            {/* end donations */}
          </div>
          {/* end menu options */}
        </div>
      )}
    </>
  );
};

export default Header;
