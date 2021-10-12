import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState, loginData } from "../recoil/atoms";
import axios from "axios";

export default function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const [loginClicked, setLoginClicked] = useRecoilState(loginState);
  const [loginDataState, setLoginDataState] = useRecoilState(loginData);
  const [loginStatus, setLoginStatus] = useState(null);
  const [emptyCredentials, setEmptyCredentials] = useState(null);
  const [loginBgColor, setLoginBgColor] = useState(
    "bg-red-400 cursor-pointer hover:bg-red-600"
  );

  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  const onLogin = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const identifier = identifierRef.current.value;

    if (password == "" || identifier == "") {
      setEmptyCredentials("Enter Credentials and try again");
      return;
    }

    let url = "http://localhost:3000/api/login";

    await axios({
      method: "post",
      url: url,
      data: {
        identifier: identifier,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //'Authorization': 'Bearer '+token
      },
      //headers: {'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        if (response.data.status == 1) {
          setShowModal(false);
          setLoginClicked(true);
          setLoginStatus(1);
          setLoginDataState(response.data.data);
        } else {
          setLoginStatus(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (loginClicked) {
      setLoginBgColor("bg-green-400 cursor-pointer hover:bg-green-600");
    } else {
      setLoginBgColor("bg-red-400 cursor-pointer hover:bg-red-600");
    }
  }, [loginClicked]);

  return (
    <>
      <div
        onClick={() => {
          setShowModal(true);
        }}
        className={`py-3 pl-4 text-white  cursor-pointer  hover:transition-all hover:duration-600 ${loginBgColor}`}
      >
        <div className="flex justify-between text-sm rounded">
          <div className="flex">
            {loginClicked ? (
              <LockOpenIcon className="h-6" />
            ) : (
              <LockClosedIcon className="h-6" />
            )}

            <span className="pl-2">Make Payment</span>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none opacity-95 backdrop-blur-[2px]">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-center p-5 text-center text-white bg-red-400 border-b border-solid rounded-t border-blueGray-200 justify-items-center">
                  <LockClosedIcon className="h-6" />
                  <div className="text-xl font-bold">Login</div>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto w-[600px] p-6 ">
                  <div className="mb-3 shadow-lg">
                    {loginStatus == 0 ? (
                      <div className="p-3 text-white bg-red-500 rounded-lg">
                        Username or Password is not correct
                      </div>
                    ) : (
                      <span></span>
                    )}
                    {emptyCredentials !== null ? (
                      <div className="p-3 text-white bg-red-500 rounded-lg">
                        Enter Username or Password and try again
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <span className="pl-2 font-bold text-gray-600">Username</span>
                  <input
                    placeholder="Enter Username"
                    type="text"
                    ref={identifierRef}
                    className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
                  />
                  <br />
                  <span className="pl-2 font-bold text-gray-600">Password</span>
                  <input
                    placeholder="Enter Password"
                    type="password"
                    ref={passwordRef}
                    className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
                  />
                  <br />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="p-3 px-6 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-400 rounded-lg outline-none hover:shadow-lg hover:bg-red-300 background-transparent focus:outline-none"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setLoginClicked(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="p-3 px-6 mb-1 mr-1 text-sm font-bold text-white transition-all duration-150 ease-linear bg-green-400 rounded-lg shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg hover:bg-green-300 active:scale-90 focus:outline-none"
                    type="button"
                    onClick={onLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
