import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/smallCard';

export default function Home({fetchedData, sermonData}) {
  
  return (
    <div className="">
      <Head>
        <title>iDress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Banner/>

      <main className="px-8 mx-auto max-w-7xl sm:px-16">
        <section className='pt-6'>
          <h2 className="pb-5 text-4xl font-semibold ">Explore Nearby</h2>
          {/* add data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fetchedData['page_contents']?.map((item) => (
             <SmallCard key={item.id} image={item.image.url} title={item.title} publishedAt={item.published_at} />
          ))}
          </div>
         
        </section>

        <section>
          <h2 className="py-8 text-4xl font-semibold">Video Sermons</h2>
          <div className="flex p-2 space-x-3 overflow-scroll scrollbar-hide">
          {sermonData['page_contents']?.map((item)=>(
            <MediumCard key={item.id} video={item.fileCaption} title={item.title} publishedAt={item.published_at}/>
          ))}
          </div>
        </section>

      </main>
      
    </div>
  )
}

export async function getStaticProps(){
  const fetchedData = await fetch('http://localhost:1337/pages/1')
  .then(
    (res) => res.json()
  )
  const sermonData = await fetch('http://localhost:1337/pages/4')
  .then(
    (res) => res.json()
  )
  return {
    props: {
      fetchedData,
      sermonData
    }
  }
}
