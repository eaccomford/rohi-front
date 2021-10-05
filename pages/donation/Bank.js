import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
    PencilAltIcon,
    SaveAsIcon,
  } from "@heroicons/react/solid";
function Bank() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const onButtonClick = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;
        const userData = {
          name: name,
          email: email,
          message: message,
          sermonId: sermonId,
        };
    
        const res = await fetch(
          `http://localhost:3000/api/sermon-comment/${sermonId}`,
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
          }
        );
    
        setSermonCommentState(await res.json());
    
        emailRef.current.value = "";
        messageRef.current.value = "";
        nameRef.current.value = "";
      };
      
    return (
        <div>
            <div data-aos="zoom-in-up">
            <h1 className="py-3 text-2xl font-bold">Donation By Using The Bank</h1>
              Bank Options
           

            {/* form */}
            <div className="w-full pr-2">
              <div
                className="flex inline-block p-2 text-sm font-bold text-white bg-green-400 rounded-lg cursor-pointer hover:bg-green-300"
              >
                <PencilAltIcon className="h-6" />
                <span>Enter MOMO Details</span>
              </div>
                <div className="transition-all ease-in-out transform duration-600">
                  <input
                    ref={nameRef}
                    placeholder="Name"
                    type="text"
                    className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
                  />
                  <br />
                  <input
                    ref={emailRef}
                    placeholder="Email"
                    type="text"
                    className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
                  />
                  <br />
                  <textarea
                    rols="4"
                    placeholder="Message"
                    cols="30"
                    ref={messageRef}
                    type="text"
                    className="w-full p-2 mx-2 my-3 border-2 rounded-lg"
                  />
                  <br />

                  <button
                    className="p-2 mx-2 text-white bg-green-400 rounded-lg shadow-md hover:shadow-lg hover:bg-green-200 active:scale-90 hover:shadow-xl"
                    onClick={onButtonClick}
                  >
                    <div className="flex">
                      <SaveAsIcon className="h-6" />
                      <span>Donate</span>
                    </div>
                  </button>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Bank
