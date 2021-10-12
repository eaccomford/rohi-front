import Link from 'next/Link';
import Image from 'next/image';

function SmallCard({ id, image, title, publishedAt }) {
  return (
    <Link href={`/sermons/${id}`}>
      <div className="flex items-center m-2 mt-5 space-x-4 transition duration-700 ease-out transform cursor-pointer hover:bg-gray-100 focus:scale-105">
        <div className="relative w-16 h-16">
          <Image
            src={process.env.NEXT_PUBLIC_URL + image}
            layout="fill"
            className="rounded-lg"
          />
        </div>
        <div>
          <h2>{title}</h2>
          <h3 className="text-gray-500">{publishedAt}</h3>
        </div>
      </div>
    </Link>
  );
}

export default SmallCard;
