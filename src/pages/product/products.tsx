import { useSelector } from "react-redux";
import { CategoryListWithIcon } from "../../components/molecules/categoryList";
import ListProduct from "../../components/molecules/product/ListProduct";
import FilterOptions from "../../components/organisms/filter/FilterOptions";
import { RootState } from "../../redux/store";

const Products = () => {
  const newProducts = useSelector((state: RootState) => state.product.product);

  return (
    <section>
      <CategoryListWithIcon />
      <div className="flex">
        <div className="basis-1/4 mr-6">
          <FilterOptions />
        </div>
        <div className="basis-3/4">
          <ListProduct productList={newProducts} className="grid-cols-3" />
        </div>
      </div>
      <div>
        <section className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
          <div className="flex gap-4">
            <img src="/assets/icons/service/computer_icon.svg" alt="" />
            <p className="text-xl self-center">Latest and Greatest Tech</p>
          </div>
          <div className="flex gap-4">
            <img src="/assets/icons/service/guard_icon.svg" alt="" />
            <p className="text-xl self-center">Guarantee</p>
          </div>
          <div className="flex gap-4">
            <img src="/assets/icons/service/shipping_icon.svg" alt="" />
            <p className="text-xl self-center">Free Shipping over 1000$</p>
          </div>
          <div className="flex gap-4">
            <img src="/assets/icons/service/time_support_icon.svg" alt="" />
            <p className="text-xl self-center">24/7 Support</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Products;
