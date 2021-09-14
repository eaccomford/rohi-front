import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
function Details({ fetchedData }) {
  const [showScrollHead, setShowScrollHead] = useState(false);
  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset > 0) {
        setShowScrollHead(true);
      } else {
        setShowScrollHead(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [showScrollHead]);
  const router = useRouter();
  const id = router.query.sermonId;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const onButtonClick = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    const userData = [name, email, message];
    console.log("=======");
    console.log(userData);

    emailRef.current.focus();
  };

  return (
    <div>
      <Header showScrollHead={showScrollHead} searchTermValue="" />
      <Banner />
      <main className="max-w-full px-8 mx-auto md:px-32">
        <h1 className="p-3 text-4xl">{fetchedData?.title}</h1>
        <h2 className="p-3 my-3 text-white bg-yellow-600 rounded-lg shadow-lg">
          {fetchedData?.subTitle}
        </h2>
        <div className="grid grid-cols-1 mb-5 md:grid-cols-2">
          <div className="">
            <Image
              layout="responsive"
              objectFit="cover"
              src={`http://localhost:1337${fetchedData?.image.url}`}
              width="600"
              height="500"
              className="rounded-lg"
            />
          </div>
          <div className="p-3 my-3">
            <div className="p-3">{fetchedData?.body}</div>
            <div className="w-full p-3 pr-5 shadow-lg">
              <h1 className="inline-block p-3 mx-3 text-xl font-bold text-white bg-yellow-400 rounded-lg">
                Leave a Comment
              </h1>
              <form>
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
                  className="p-2 mx-2 bg-yellow-400 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-100 active:scale-90 hover:shadow-xl"
                  onClick={onButtonClick}
                >
                  Save work
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          sermonId: "1",
        },
      },
      {
        params: {
          sermonId: "m2",
        },
      },
    ],
  };
}
export async function getStaticProps(context) {
  // use if u dont need req and res and for that dont change frequenly

  const sermonId = context.params.sermonId;
  const fetchedData = await fetch(
    `http://localhost:1337/page-contents/${sermonId}`
  ).then((res) => res.json());
  return {
    props: {
      fetchedData,
    },
    revalidate: 10, // 3600 = 1hr, 1= 1seconds
  };
}

export default Details;
