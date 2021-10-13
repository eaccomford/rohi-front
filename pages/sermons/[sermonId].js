import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useRecoilState } from 'recoil';
import {
  UsersIcon,
  GiftIcon,
  BookmarkAltIcon,
  PencilAltIcon,
  ChatIcon,
  SaveAsIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NextNprogress from 'nextjs-progressbar';
import Footer from '../../components/Footer';
import { loginState, loginData } from '../../recoil/atoms';

function Details({ fetchedData, eventsData }) {
  const [showScrollHead, setShowScrollHead] = useState(true);
  const [showMenuSmState, setShowMenuSmState] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [sermonCommentState, setSermonCommentState] = useState([]);
  const [formError, setFormError] = useState(null);
  const [loginClicked, setLoginClicked] = useRecoilState(loginState);
  const [loginDataState, setLogindataState] = useRecoilState(loginData);

  const router = useRouter();
  const sermonId = router.query.sermonId;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/sermon-comment/${sermonId}`
    ).then((res) => res.json());
    setSermonCommentState(res);
  }, [sermonId]);

  useEffect(() => {
    AOS.init({
      easing: 'zoom-in-up',
      once: false,
      duration: 1000,
    });
  }, [sermonId]);

  const showCommentBox = () => {
    showCommentForm ? setShowCommentForm(false) : setShowCommentForm(true);
  };

  const onButtonClick = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value;
    if (!loginClicked) {
      var loginName = nameRef.current.value;
      var email = emailRef.current.value;

      if (loginName === '' || email === '' || message === '') {
        setFormError('Name, Email and Message are required');
        setTimeout(() => {
          setFormError(null);
        }, 3000);
        return;
      }
    } else {
      var email = loginDataState?.user?.username;
      var loginName = loginDataState?.user?.username;
    }

    const userData = {
      name: loginName,
      email: email,
      message: message,
      sermonId: sermonId,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/sermon-comment/${sermonId}`,
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    setSermonCommentState(await res.json());
    if (!loginClicked) {
      emailRef.current.value = '';
      messageRef.current.value = '';
      nameRef.current.value = '';
    } else {
      messageRef.current.value = '';
    }
  };

  const showMenuSm = (menu) => {
    let mn = '#menu' + menu;

    if (showMenuSmState == false) {
      document.querySelector(mn).style.display = 'flex';
      setShowMenuSmState(true);
    } else {
      document.querySelector(mn).style.display = 'none';
      setShowMenuSmState(false);
    }
  };

  return (
    <div>
      <NextNprogress color="#29D" height={3} showOnShallow={true} />
      <Header showScrollHead={showScrollHead} searchTermValue="" />
      <main className="px-8 mx-auto md:px-50 md:mx-20 md:px-[20em]">
        <div className="grid grid-cols-1 mb-5 lg:grid-cols-6 ">
          {/* other navs */}
          <div className="hidden sm:pr-3 sm:block">
            <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Menus</h1>

              <div className="py-3 pl-4 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <div className="flex">
                    <GiftIcon className="h-6" />
                    <span className="pl-2">Charity Works</span>
                  </div>
                </div>
              </div>
              <div className="py-3 pl-4 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <div className="flex">
                    <UsersIcon className="h-6" />
                    <span className="pl-2">Consultation</span>
                  </div>
                </div>
              </div>
              <div className="py-3 pl-4 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <div className="flex">
                    <ChatIcon className="h-6" />
                    <span className="pl-2">Messages</span>
                  </div>
                </div>
              </div>
              <div className="py-3 pl-4 hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <div className="flex">
                    <BookmarkAltIcon className="h-6" />
                    <span className="pl-2">Books</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* main content */}
          <div className="grid col-span-3 pb-3 mb-3 md:border-l md:border-r md:px-3">
            <div data-aos="zoom-in-up">
              <h1 className="py-3 text-xl font-bold">{fetchedData?.title}</h1>
              {/* image */}
              <Image
                layout="responsive"
                objectFit="cover"
                src={`${process.env.NEXT_PUBLIC_URL}${fetchedData?.image.url}`}
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
                className="flex inline-block p-2 ml-2 text-sm font-bold text-white bg-green-400 rounded-lg cursor-pointer hover:bg-green-300"
              >
                <PencilAltIcon className="h-6" />
                <span>Leave a Comment</span>
              </div>
              {showCommentForm && (
                <div className="transition-all ease-in-out transform duration-600">
                  {formError && (
                    <div className="p-2 mt-2 ml-2 text-red-400 bg-red-200 rounded-lg">
                      {formError}
                    </div>
                  )}
                  {!loginClicked && (
                    <div>
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
                    </div>
                  )}
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
                  {/* <div className="flex items-center justify-center p-3 mt-4 mb-5 bg-gray-200 rounded-lg">
                    <p className="pr-2">Reply</p>
                    <input
                      className="flex-grow p-2 border rounded-full focus:outline-none"
                      placeholder="enter comment"
                      type="text"
                    />
                  </div> */}
                </div>
              ))}
              {sermonCommentState.length < 1 && (
                <div className="p-3 text-sm bg-gray-100 rounded-lg">
                  Be the first to comment
                </div>
              )}
            </div>
          </div>

          {/* categories */}
          <div className="col-span-2 mb-5 sm:pl-3">
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
              <h1 className="p-2 text-xl font-bold">You May Also Like</h1>
              {eventsData['page_contents']?.map(
                (item, index) =>
                  index < 6 && (
                    <Link href={`/sermons/${item.id}`}>
                      <div
                        key={item.id}
                        className="relative px-2 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600 active:scale-90 hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center">
                          <div className="mr-2 text-gray-400">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_URL}${item.image.formats.thumbnail.url}`}
                              width="50"
                              height="50"
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex-grow px-1 text-md">
                            {item.title}
                          </div>
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
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    fallback: 'blocking', // if false nextjs will build and save the pages and requested param not found u get 404. true, blocking
    paths: [
      {
        params: {
          sermonId: '1',
        },
      },
    ],
  };
}
export async function getStaticProps(context) {
  // use if u dont need req and res and for that dont change frequenly

  const sermonId = context.params.sermonId;
  const fetchedData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/page-contents/${sermonId}`
  ).then((res) => res.json());

  const eventsData = await fetch(`${process.env.NEXT_PUBLIC_URL}/pages/1`).then(
    (res) => res.json()
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
