import HeaderDefault from "../components/HeaderDefault";
import Image from 'next/image'
function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] md:h-[350px]">
            <Image layout="fill" objectFit="cover" className="xblur-sm" src="http://localhost:1337/uploads/small_church1_3798f81f93.jpeg?80751"  />
            <div className="absolute w-full p-2 text-center rounded top-1/2">
                <p className="text-sm font-bold text-white sm:text-lg">Not sure  what to go? perfect</p>
                <button className="px-10 py-4 my-3 font-bold text-purple-500 transition duration-200 bg-white rounded-full shadow-md active:scale-90 hover:shadow-xl">
                    Click Here
                </button>
            </div>
            <div className="absolute top-0 w-full">
                <HeaderDefault/>
            </div>
        </div>
    )
}

export default Banner
