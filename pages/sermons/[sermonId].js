import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
function Details({ fetchedData, eventsData }) {
  const [showScrollHead, setShowScrollHead] = useState(true);
  const [showMenuSmState, setShowMenuSmState] = useState(false);

  const router = useRouter();
  const id = router.query.sermonId;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    document.querySelector(".showMenuSm").style.display = "none";
  }, []);

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

  const showMenuSm = (menu) => {
    let mn = "#menu" + menu;

    if (showMenuSmState == false) {
      document.querySelector(mn).style.display = "flex";
      setShowMenuSmState(true);
    } else {
      document.querySelector(mn).style.display = "none";
      setShowMenuSmState(false);
    }
  };

  return (
    <div>
      <Header showScrollHead={showScrollHead} searchTermValue="" />
      <main className="px-8 mx-auto md:px-50 md:mx-20 md:px-[20em]">
        <div className="grid grid-cols-1 mb-5 lg:grid-cols-6 ">
          {/* other navs */}
          <div className="md:pr-3">
            <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Menus</h1>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Charity Works</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Consultation Works</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Delivrance</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Consultation Works</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Delivrance</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Consultation Works</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <p className="text-gray-400">❤️</p>
                  <p>Delivrance</p>
                </div>
              </div>
              
            </div>
          </div>

          {/* main content */}
          <div className="grid col-span-3 pb-3 mb-3 md:border-l md:border-r md:px-3">
            <h1 className="py-3 text-xl font-bold">{fetchedData?.title}</h1>
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
            {/* form */}
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
            {/* comments */}
            <div className="mt-10">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
          {/* categories */}
          <div className="col-span-2 pl-3 mb-5">
            <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Most Viewed</h1>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="text-sm rounded">
                  <p className="text-gray-400">What is Love</p>
                  <p className="py-2 text-lg">How to Love</p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                  <p>❤️ 3000</p>
                </div>
              </div>
              <div className="p-2 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="mt-5 text-sm rounded hover:bg-gray-200 hover:transition-all hover:duration-600">
                  <p className="text-gray-400">Outreach Work</p>
                  <p className="py-2 text-lg">Accra 2-2-2021</p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                  <p>❤️ 4400</p>
                </div>
              </div>
            </div>

            <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Events</h1>
              {eventsData["page_contents"]?.map((item) => (
                <div
                  key={item.id}
                  className="relative px-2 hover:bg-gray-200 hover:transition-all hover:duration-600"
                >
                  <div className="flex items-center justify-center">
                    <div className="mr-2 text-gray-400">
                      <Image
                        src={`http://localhost:1337${item.image.formats.thumbnail.url}`}
                        width="50"
                        height="50"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-grow px-1 text-md">{item.title}</div>
                    <div className="flex items-center justify-center pl-1 rounded-3xl">
                      <span
                        onClick={() => showMenuSm(item.id)}
                        className="text-3xl cursor-pointer pb-15 hover:bg-blue-100 hover:rounded-full hover:p-1"
                      >
                        ...
                      </span>
                    </div>
                  </div>
                  <div
                    id={`menu${item.id}`}
                    className="showMenuSm absolute top-0 right-10 w-40 bg-gray-300 h-[60px] p-2  rounded-lg text-sm hidden"
                  >
                    <p> ❤️ I am Intrested</p>
                    <p> 😔 I Not Intrested</p>
                  </div>
                </div>
              ))}
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
  const eventsData = await fetch(`http://localhost:1337/pages/1`).then((res) =>
    res.json()
  );
  return {
    props: {
      fetchedData,
      eventsData,
    },
    revalidate: 10, // 3600 = 1hr, 1= 1seconds
  };
}

export default Details;
