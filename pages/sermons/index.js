import { Fragment,useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import SmallCard from "../../components/SmallCard";
import Fuse from 'fuse.js'
function index({ fetchedData }) {
  const [searchValue, setSearchValue] = useState('')

  const showScrollHead = true;
  const searchTermValue = (value) => {
    setSearchValue(value)
  }

  const fuse = new  Fuse(fetchedData["page_contents"], {
    keys: ['title','published_at']
  })
  const results = fuse.search(searchValue)
  const sermondata = searchValue ? results.map(result => result.item) : fetchedData["page_contents"]

  return (
    <Fragment>
      <Header showScrollHead={showScrollHead} searchTermValue={searchTermValue}/>

      {/* banner */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] md:h-[350px]">
        <Image
          layout="fill"
          objectFit="cover"
          className="xblur-sm"
          src="http://localhost:1337/uploads/small_church1_3798f81f93.jpeg?80751"
        />
        <div className="absolute w-full p-2 text-center rounded top-1/2">
          <p className="text-sm font-bold text-white sm:text-lg">
            Not sure what to go? perfect
          </p>
          <button className="px-10 py-4 my-3 font-bold text-purple-500 transition duration-200 bg-white rounded-full shadow-md active:scale-90 hover:shadow-xl">
            Click Here
          </button>
        </div>
      </div>

      {/* page content */}
      <main className="max-w-full px-8 mx-auto md:px-32">
      <section className="pt-6">
      <h2 className="pb-5 text-4xl font-semibold ">Sermons</h2>
        {/* add data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sermondata?.map((item) => (
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
      </main>

    </Fragment>
  );
}

export default index;

export async function getStaticProps() {
  // use if u dont need req and res and for that dont change frequenly
  const fetchedData = await fetch("http://localhost:1337/pages/1").then((res) =>
    res.json()
  );
  return {
    props: {
      fetchedData
    },
    revalidate: 10 // 3600 = 1hr, 1= 1seconds
  };
}

// export async function getServerSideProps(context) {
//   // this works only on the server, if u need to use the request and response object
//   // const req = context.req
//   // const res = context.res
//   const fetchedData = await fetch("http://localhost:1337/pages/1").then((res) =>
//     res.json()
//   );
//   return {
//     props: {
//       fetchedData
//     }
//   };
// }
