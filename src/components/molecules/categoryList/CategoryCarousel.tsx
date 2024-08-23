import { useSelector } from "react-redux";

import ImgAndNameCard from "../../atoms/cards/ImgAndNameCard";
import CarouselWithButton from "../../atoms/carousel/CarouselWithButton";

import { RootState } from "../../../redux/store";

const CategoryCarousel = () => {
  const categoriesList = useSelector(
    (state: RootState) => state.product.categories
  );

  return (
    <section className="py-6 md:py-12 my-3">
      <CarouselWithButton slideToShow={6}>
        {categoriesList?.map((item) => {
          return (
            <ImgAndNameCard
              key={item.id}
              name={item.name}
              img={item.image}
              className="my-3"
            />
          );
        })}
      </CarouselWithButton>
    </section>
  );
};

export default CategoryCarousel;
