import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getSimilarProductThunk } from "../../../redux/slice/productSlice";
import CarouselWithButton from "../../atoms/carousel/CarouselWithButton";
import ProductCard from "../../atoms/cards/product/ProductCard";
import { Product } from "../../../types/Product";

type Props = {
  product?: Product | null;
};

const ProductSimilarCarousel = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (product) dispatch(getSimilarProductThunk(product));
  }, [dispatch, product]);
  const similarProd = useSelector(
    (state: RootState) => state.product.similarProduct
  );

  return (
    <div>
      <div className="font-medium text-xl mb-8">Similar Product</div>
      <CarouselWithButton slideToShow={4}>
        {similarProd?.map((product) => {
          return (
            <ProductCard
              color={product.color}
              key={product.id}
              name={product.name}
              id={product.id}
              image={product.image}
              price={product.price}
              rating={product.rating}
              favorite={product.favorite}
              percent={product.percent}
              salePrice={product.salePrice}
            />
          );
        })}
      </CarouselWithButton>
    </div>
  );
};
export default ProductSimilarCarousel;
