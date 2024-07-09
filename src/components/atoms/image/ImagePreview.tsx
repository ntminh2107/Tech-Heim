import React, { useState } from "react";
import { ImagePreview } from "../../../types/Product";

type ImagePreviewProps = {
  imageUrl: string;
  width: string | number;
  height: string | number;
  imagePreview: ImagePreview[] | null;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  width,
  height,
  imagePreview,
}) => {
  const [selectedImage, setSelectedImage] = useState(imageUrl);

  const handleChangeImg = (img: string) => {
    setSelectedImage(img);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className={`w-[${width}] h-[${height}] `}>
        <img
          className="w-full h-full object-cover"
          src={selectedImage}
          alt=""
        />
      </div>
      <div>
        <div className={`flex flex-row gap-6 `}>
          {imagePreview?.slice(0, 5).map((item) => (
            <img
              src={item?.img || ""}
              className="max-w-20 max-h-[4.438rem] cursor-pointer object-cover"
              onClick={() => handleChangeImg(item?.img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ImagePreview;
