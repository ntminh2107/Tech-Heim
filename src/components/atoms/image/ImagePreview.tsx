import React, { useEffect, useState } from "react";
import type { ImagePreview as ImagePreviewType } from "../../../types/Product";

type ImagePreviewProps = {
  imageUrl: string;
  width: string | number;
  height: string | number;
  imagePreview: ImagePreviewType[] | null;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  width,
  height,
  imagePreview,
}) => {
  const [selectedImage, setSelectedImage] = useState(imageUrl);

  useEffect(() => {
    if (imagePreview && imagePreview.length > 0) {
      setSelectedImage(imagePreview[0].img);
    }
  }, [imagePreview]);

  const handleChangeImg = (img: string) => {
    setSelectedImage(img);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className={`w-[${width}] h-[${height}] bg-white`}>
        <img
          className="h-full w-full object-contain"
          src={selectedImage}
          alt=""
        />
      </div>
      <div>
        <div className="flex flex-row gap-6">
          {imagePreview?.slice(0, 5).map((item) => (
            <img
              key={item.img}
              src={item?.img || ""}
              className="w-20 max-h-[4.438rem] cursor-pointer object-cover"
              onClick={() => handleChangeImg(item?.img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
