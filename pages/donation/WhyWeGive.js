import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PencilAltIcon, SaveAsIcon } from '@heroicons/react/solid';
function WhyWeGive({ fetchedData }) {
  return (
    <div>
      <div data-aos="zoom-in-up">
        <h1 className="py-3 text-2xl font-bold">Why We Give</h1>
        <hr />
        <h1 className="py-3 text-xl">{fetchedData?.title}</h1>
        {/* image */}
        <Image
          layout="responsive"
          objectFit="cover"
          src={`${process.env.NEXT_PUBLIC_URL}${fetchedData?.image.url}`}
          width="600"
          height="300"
          objectFit="fill"
          className="rounded-lg"
        />
        <h2 className="p-3 my-3 text-gray-500 rounded-lg">
          {fetchedData?.subTitle}
        </h2>
        <h2 className="pb-3 mb-3 text-gray-800 rounded-lg ">
          {fetchedData?.body}
        </h2>
      </div>
    </div>
  );
}

export default WhyWeGive;
