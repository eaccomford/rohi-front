import Image from 'next/image';
function LargeCard({ image, title, subTitle, body, btnText }) {
  return (
    <section className="relative py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="relative">
          <Image
            // placeholder="blur"
            src={process.env.NEXT_PUBLIC_URL + image}
            layout="responsive"
            objectFit="fill"
            className="rounded-tl-lg sm:rounded-bl-lg"
            height="250px"
            width="400px"
          />
          <div className="absolute bottom-0 mx-5">
            <h2 className="text-md">{title}</h2>
            <p className="mt-5 text-sm">{subTitle}</p>
          </div>
        </div>
        <div className="rounded-br-lg sm:rounded-tr-lg mx-5x sm:flex sm:justify-center sm:items-center bg-gradient-to-r from-gray-100 to-gray-300">
          <div className="mx-5">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-5">{subTitle}</p>
            <p className="mt-5">{body}</p>
            <button className="px-4 py-2 mt-2 text-sm text-white bg-gray-900 rounded-lg cursor-pointer">
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LargeCard;
