import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../../../../redux/slice/productSlice";
import { AppDispatch } from "../../../../redux/store";

import HeartTag from "../../Tag/HeartTag";
import ProductCardFooter from "./ProductCardFooter";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

type Props = {
  id: string;
  color: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  percent?: number;
  favorite?: boolean;
  rating: number;
};

const ProductCard = ({
  id,
  image,
  color,
  name,
  price,
  favorite,
  percent,
  rating,
  salePrice,
}: Props) => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    nav(`/products/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(
      addCartItemThunk({ productId: id, color, image, name, price, salePrice })
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div
      className="relative rounded-md bg-white  sm:w-full
     md:w-52 lg:w-50 xl:w-72 h-auto flex flex-col gap-3 shadow-md group hover:shadow-lg cursor-pointer p-4 "
    >
      {loading ? (
        <>
          <Skeleton.Image
            active={loading}
            className=" object-contain size-fit w-full h-40 md:h-32 lg:h-48"
          />
          <div className="gradient-black mx-2"></div>
          <div className="flex-1 flex flex-col justify-between pb-2 px-2">
            <Skeleton paragraph={{ rows: 2 }} active={loading} />
          </div>
        </>
      ) : (
        <>
          {percent && (
            <p className="absolute top-2 left-0 py-1 px-[6px] text-secondary-400 bg-secondary-100 rounded-tr-xl rounded-br-xl group-hover:hidden">
              {percent}%
            </p>
          )}
          <HeartTag id={id} favorite={favorite} key={id} />
          <div
            className="flex justify-center items-center w-full h-40 md:h-32 lg:h-48"
            onClick={handleClick}
          >
            <img
              src={image}
              alt={name}
              className="object-contain w-full h-full p-2"
            />
          </div>
          <div className="gradient-black mx-2"></div>
          <div className="flex-1 flex flex-col justify-between pb-2 px-2">
            <h5 className="pb-2 line-clamp-2 group-hover:text-primary text-sm sm:text-base lg:text-lg min-h-[44px]">
              {name}
            </h5>
            <div className=" relative h-[30px]">
              <ProductCardFooter
                price={price}
                salePrice={salePrice}
                rating={rating}
                onClick={handleAddToCart}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
