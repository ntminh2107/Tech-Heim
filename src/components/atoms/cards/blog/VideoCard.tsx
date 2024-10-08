type VideoProps = {
  id: string;
  image: string;
  title: string;
  url: string;
};

const VideoCard = ({ id, image, title, url }: VideoProps) => {
  return (
    <div>
      <a
        href={url}
        target="_blank"
        key={id}
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg shadow-lg h-[206px] relative"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-4xl">&#9654;</span>
        </div>
        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white p-4 text-center">
          <p className="mt-2 text-m font-bold">{title}</p>
        </div>
      </a>
    </div>
  );
};

export default VideoCard;
