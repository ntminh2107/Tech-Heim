import { useSelector } from "react-redux";

import CarouselWithButton from "../../atoms/carousel/CarouselWithButton";
import { RootState } from "../../../redux/store";
import ProductSaleCard from "../../atoms/cards/product/ProductSaleCard";

const ProductSale = () => {
  const productSale = useSelector(
    (state: RootState) => state.product.productSale
  );

  return (
    <section className="bg-primary-500 rounded-lg">
      <div className="lg:pt-12 pb-2 grid lg:grid-rows-1 grid-cols-12 px-6 ">
        <div className="text-white col-span-12 pt-4  lg:col-span-3 mr-16 lg:text-center flex lg:flex-col">
          <h4 className="text-2xl font-semibold">
            Products On Sale
            <span className="text-xl mt-2 font-light lg:hidden">
              {" "}
              Shop now!
            </span>
          </h4>
          <h5 className="text-xl mt-2 hidden lg:block">Shop Now!</h5>
        </div>
        <div className="min-h-0 min-w-0 lg:col-span-9 col-span-12">
          <CarouselWithButton
            slideToShow={4}
            arrows={false}
            slideButton
            className="gap-10"
          >
            {productSale.map((item) => {
              return (
                <ProductSaleCard
                  id={item.id}
                  key={item.id}
                  favorite={item.favorite}
                  name={item.name}
                  newPrice={item.salePrice}
                  image={item.image}
                  percent={item.percent}
                  oldPrice={item.price}
                />
              );
            })}
          </CarouselWithButton>
        </div>
      </div>
    </section>
  );
};

export default ProductSale;
