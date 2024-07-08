import { useState } from "react";
import { Product } from "../../../types/Product";
import { Carousel } from "antd";
import CarouselWithButton from "../../atoms/carousel/CarouselWithButton";

type Props = {
  product?: Product | null;
};

const ProductImgCarousel = ({ product }: Props) => {
  const [selectedImage, setSelectedImage] = useState(product?.image);

  console.log(product?.imagePreview);

  const handleChangeImg = (img: string) => {
    setSelectedImage(img);
  };
  return (
    <div className="flex flex-col">
      <img
        src={selectedImage}
        alt={product?.name}
        className="h-[21.125rem] w-[31rem]"
        onClick={() => console.log(selectedImage)}
      />
      <section className="py-6 md:py-12 w-full">
        <Carousel>
          {product?.imagePreview.map((item) => (
            <div className="items-center">
              <img
                src={item.img}
                alt={product.name}
                className="w-[4.43rem] h-[5rem] cursor-pointer"
                onClick={() => handleChangeImg(item.img)}
              />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};
export default ProductImgCarousel;
