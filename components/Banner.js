import Image from 'next/image'
function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] md:h-[350px]">
            <Image layout="fill" objectFit="cover" className="blur-sm" src="http://localhost:1337/uploads/small_Publisher_Advisory_Get_Ready_for_the_Office_2010_End_of_Support_header_85db996b38.jpg?7815344"  />
            <div className="absolute w-full p-2 text-center rounded top-1/2">
                <p className="text-sm sm:text-lg">Not sure  what to go? perfect</p>
                <button className="px-10 py-4 my-3 font-bold text-purple-500 transition duration-200 bg-white rounded-full shadow-md active:scale-90 hover:shadow-xl">
                    Click Here
                </button>
            </div>
        </div>
    )
}

export default Banner
