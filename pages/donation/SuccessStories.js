import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
    PencilAltIcon,
    SaveAsIcon,
  } from "@heroicons/react/solid";
function SuccessStories({fetchedData, showCommentBox, showCommentForm, sermonCommentState}) {
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
            <h1 className="py-3 text-2xl font-bold">Success  Stories</h1>
              <h1 className="py-3 text-xl">{fetchedData?.title}</h1>
              {/* image */}
              <Image
                layout="responsive"
                objectFit="cover"
                src={`http://localhost:1337${fetchedData?.image.url}`}
                width="600"
                height="300"
                objectFit="fill"
                className="rounded-lg"
              />
              <h2 className="p-3 my-3 text-gray-500 rounded-lg">
                {fetchedData?.subTitle}
              </h2>
              <h2 className="pb-3 mb-3 text-gray-800 rounded-lg ">
                {fetchedData?.body}
              </h2>
            </div>

            {/* form */}
            <div className="w-full pr-2">
              <div
                onClick={showCommentBox}
                className="flex inline-block p-2 text-sm font-bold text-white bg-green-400 rounded-lg cursor-pointer hover:bg-green-300"
              >
                <PencilAltIcon className="h-6" />
                <span>Leave a Comment</span>
              </div>
              {showCommentForm && (
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
                      <span>Post Comment</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* comments */}
            <div className="mt-5">
              {sermonCommentState?.map((item) => (
                <div key={item.id} className="bg-gray-100 rounded-lg">
                  <div className="">
                    <div className="flex justify-between p-2 font-bold bg-gray-200">
                      <div>{item?.name}</div>
                      <div>12pm/21</div>
                    </div>
                    <div className="p-2">{item?.message}</div>
                  </div>
                </div>
              ))}
              {sermonCommentState.length < 1 && (
                <div className="p-3 text-sm bg-gray-100 rounded-lg">
                  Be the first to comment
                </div>
              )}
            </div>
        </div>
    )
}

export default SuccessStories
