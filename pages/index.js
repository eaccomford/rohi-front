import { useState, useEffect } from "react";
import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({ fetchedData, sermonData }) {
  const [showScrollHead, setShowScrollHead] = useState(false);

  useEffect(() => {
    window.onscroll = function() {
      if(window.pageYOffset > 0) {
        setShowScrollHead(true)
      }else{
        setShowScrollHead(false)
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [showScrollHead]);

  return (
    <div className="">
      <Head>
        <title>iDress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showScrollHead={showScrollHead} />
      <Banner showScrollHead={showScrollHead} />

      <main className="max-w-full px-8 mx-auto md:px-32">
        <section className="pt-6">
          <h2 className="pb-5 text-4xl font-semibold ">Explore Nearby</h2>
          {/* add data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fetchedData["page_contents"]?.map((item) => (
              <SmallCard
                key={item.id}
                id={item.id}
                image={item.image?.url}
                title={item.title}
                publishedAt={item.published_at}
              />
            ))}
          </div>
        </section>

        <LargeCard
          title="Rohi Foundation"
          subTitle="Providing help to mankind through the work of God"
          btnText="Visit Us"
          image="/uploads/small_3e2af664e061013a3d05aa99fa20c1d4_473af3fcc2.jpg?58464929.5"
        />

        <section>
          <h2 className="py-8 text-4xl font-semibold">Video Sermons</h2>
          <div className="flex p-2 space-x-3 overflow-scroll scrollbar-hide">
            {sermonData["page_contents"]?.map((item) => (
              <MediumCard
                key={item.id}
                video={item.fileCaption}
                title={item.title}
                publishedAt={item.published_at}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const fetchedData = await fetch("http://localhost:1337/pages/1").then((res) =>
    res.json()
  );
  const sermonData = await fetch("http://localhost:1337/pages/4").then((res) =>
    res.json()
  );
  return {
    props: {
      fetchedData,
      sermonData,
    },
  };
}
