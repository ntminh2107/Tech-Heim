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
      <div className="xl:pt-12 pb-2 xl:grid xl:grid-cols-12  px-6 flex flex-col">
        <div className="text-white col-span-12 pt-4 content-center  lg:col-span-3 mr-16 xl:text-center flex xl:flex-col">
          <h4 className="text-2xl font-semibold">Products On Sale</h4>
          <h5 className="text-xl mt-2 hidden xl:block">Shop Now!</h5>
        </div>
        <div className="xl:col-span-9 w-full">
          <CarouselWithButton slideToShow={5} arrows={false} slideButton>
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
