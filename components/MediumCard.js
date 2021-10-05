import React from 'react'
import ReactPlayer from "react-player/youtube";
function MediumCard({ video, title, publishedAt }) {
  return (
    <div className="mt-5 mb-5 transition duration-500 ease-out transform cursor-pointer hover:scale-105">
      <div className="relative rounded-lg">
        <ReactPlayer url={video} width="50vh" height="40vh" controls   />
      </div>
      <h3 className="mt-3 text-xl">{title}</h3>
    </div>
  );
}

export default MediumCard;



