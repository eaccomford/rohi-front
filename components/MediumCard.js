import ReactPlayer from "react-player";
function MediumCard({ video, title, publishedAt }) {
  return (
    <div className="transition duration-700 ease-out transform cursor-pointer hover:scale-105">
      <div className="relative rounded-lg">
        <ReactPlayer url={video} width="30vh" height="20vh" controls/>
      </div>
      <h3 className="mt-3 text-xl">{title}</h3>
    </div>
  );
}

export default MediumCard;
