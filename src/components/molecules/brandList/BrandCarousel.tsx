import { Carousel } from "antd";
import { Brand } from "../../../types/Product";
import CarouselWithButton from "../../atoms/carousel/CarouselWithButton";

type Props = {
  brand: Brand[];
};

const BrandCarousel = ({ brand }: Props) => {
  return (
    <section className="lg:hidden block mb-5">
      <Carousel
        slidesToShow={3}
        infinite
        className="content-center"
        autoplay
        dots={false}
      >
        {brand.map((item) => (
          <div className="w-full h-20 content-center" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="object-contain w-full h-full aspect-square "
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default BrandCarousel;
