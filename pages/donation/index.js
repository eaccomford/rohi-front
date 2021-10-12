import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import {
  UsersIcon,
  GiftIcon,
  BookmarkAltIcon,
  ChatIcon, NewspaperIcon
} from "@heroicons/react/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import NextNprogress from "nextjs-progressbar";
import Footer from "../../components/Footer";
import MostViewed from "../../components/MostViewed";
import SuccessStories from "./SuccessStories";
import Bank from "./Bank";
import Momo from "./Momo";
import PaymentHistory from "./PaymentHistory";
import WhyWeGive from "./WhyWeGive";
import LoginModal from "../../components/LoginModal";
import { useRecoilState } from "recoil";
import {loginState} from '../../recoil/atoms'

function Index({ fetchedData, eventsData }) {
  const [showScrollHead, setShowScrollHead] = useState('');
  const [toggleMenuState, setToggleMenuState] = useState('whywegive');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [sermonCommentState, setSermonCommentState] = useState([]);
  const [loginClicked, setLoginClicked] = useRecoilState(loginState);

  const router = useRouter();
  const sermonId = router.query.sermonId;


  useEffect(async () => {
    const res = await fetch(
      `http://localhost:3000/api/sermon-comment/${sermonId}`
    ).then((res) => res.json());
    setSermonCommentState(res);
  }, [sermonId]);

  useEffect(() => {
    AOS.init({
      easing: "zoom-in-up",
      once: false,
      duration: 1000,
    });
  }, [sermonId]);

  const showCommentBox = () => {
    showCommentForm ? setShowCommentForm(false) : setShowCommentForm(true);
  };

  

  function toggleMenu(menu)  {
    setToggleMenuState(menu)
  };

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  useEffect(() => {
    loginClicked ? setShowPaymentOptions(true) : false
  }, )

  return (
    <div>
      <NextNprogress color="#29D" height={3} showOnShallow={true} />
      <Header showScrollHead={true} searchTermValue="" />
      
      <main className="px-8 mx-auto md:px-50 md:mx-20 md:px-[20em]">
        <div className="grid grid-cols-1 mb-5 lg:grid-cols-6 ">
          {/* other navs */}
          <div className="hidden sm:pr-3 sm:block">
            <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Donations</h1>
              {!loginClicked && <LoginModal/> }
              {loginClicked ? (
                <>
                <div onClick={() => toggleMenu('momo')} className="py-3 pl-4 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600">
                  <div className="flex justify-between text-sm rounded">
                    <div className="flex">
                      <GiftIcon className="h-6" />
                      <span className="pl-2">Mobile Money</span>
                    </div>
                  </div>
                </div>
                <div onClick={() => toggleMenu('bank')} className="py-3 pl-4 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600">
                    <div className="flex justify-between text-sm rounded">
                      <div className="flex">
                        <UsersIcon className="h-6" />
                        <span className="pl-2">Bank Deposit</span>
                      </div>
                    </div>
                  </div>
                  <div onClick={() => toggleMenu('paymentHistory')} className="py-3 pl-4 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600">
                    <div className="flex justify-between text-sm rounded">
                      <div className="flex">
                        <NewspaperIcon className="h-6" />
                        <span className="pl-2">Payment History</span>
                      </div>
                    </div>
                  </div>
                  </>
              ): null}
              <div onClick={() => toggleMenu('whywegive')} className="py-3 pl-4 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <div className="flex">
                    <ChatIcon className="h-6" />
                    <span className="pl-2">Why We Give</span>
                  </div>
                </div>
              </div>
              <div onClick={() => toggleMenu('successStory')} className="py-3 pl-4 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600">
                <div className="flex justify-between text-sm rounded">
                  <div className="flex">
                    <BookmarkAltIcon className="h-6" />
                    <span className="pl-2">Success Stories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* main content */}
          <div className="grid col-span-3 pb-3 mb-3 md:border-l md:border-r md:px-3">
            {toggleMenuState == 'successStory' && <SuccessStories 
                fetchedData={fetchedData} 
                showCommentBox={showCommentBox} 
                showCommentForm={showCommentForm} 
                sermonCommentState={sermonCommentState}
            />}
            {toggleMenuState == 'whywegive' && <WhyWeGive fetchedData={fetchedData} />}
            {toggleMenuState == 'momo' && <Momo/>}
            {toggleMenuState == 'bank' && <Bank/>}
            {toggleMenuState == 'paymentHistory' && <PaymentHistory/>}
          </div>

          {/* categories */}
          <div className="col-span-2 mb-5 sm:pl-3">
            <MostViewed />

            {/* top givers */}
            <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Top Givers</h1>
              {eventsData["page_contents"]?.map(
                (item, index) =>
                  index < 6 && (
                    <div key={item.id} className="relative px-2">
                      <div className="flex items-center justify-center">
                        <div className="mr-2 text-gray-400">
                          <Image
                            src={`http://localhost:1337${item.image.formats.thumbnail.url}`}
                            width="50"
                            height="50"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-grow px-1 text-md">
                          {item.title}
                        </div>
                      </div>
                    </div>
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

export async function getStaticProps(context) {
  const fetchedData = await fetch(
    `http://localhost:1337/page-contents/1`
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

export default Index;
