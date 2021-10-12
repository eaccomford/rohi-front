import Image from 'next/image';
function LargeCard({ image, title, subTitle, btnText }) {
  return (
    <section className="relative py-16">
      <div className="relative max-w-full h-96">
        <Image
          src={process.env.NEXT_PUBLIC_URL + image}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="absolute mx-5 top-20">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-5">{subTitle}</p>
        <button className="px-4 py-2 mt-2 text-sm text-white bg-gray-900 rounded-lg cursor-pointer">
          {btnText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;
