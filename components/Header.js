import Image from 'next/image'
const Header = () => {
    return (
        <header className="sticky top-0 z-50 grid-cols-3 bg-white shadow-md">
            <div className="relative flex items-center h-10 my-auto cursor-pointer"> 
                <Image src="http://localhost:1337/uploads/small_4000_23712fe719.jpg?459520.10000002384" layout="fill" objectFit="contain" objectPosition="left"/>
            </div>
            <div></div>
            <div></div>
        </header>
    )
}

export default Header
