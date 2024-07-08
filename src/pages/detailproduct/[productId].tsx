import { useParams } from "react-router-dom";
import PayCard from "../../components/atoms/cards/PayCard";
import ProductInfoCard from "../../components/atoms/cards/ProductInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getDetailProductThunk } from "../../redux/slice/productSlice";
import ProductTab from "../../components/molecules/productDetail/ProductTab";

const DetailProduct = () => {
  const { id } = useParams<{ id?: string }>() ?? {};
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(getDetailProductThunk(id));
    }
  }, [dispatch, id]);

  const detailProduct = useSelector(
    (state: RootState) => state.product.detailProduct
  );
  console.log(detailProduct);

  return (
    <div className="flex flex-row gap-8">
      <div className="basis-2/3 flex flex-col">
        <div className="flex flex-row gap-6">
          {/* image of Product */}
          <div className="flex flex-col gap-6 w-[31rem]">
            <img
              src="/assets/images/product/product1.png"
              className="max-w-full"
            />

            <div className="flex flex-row gap-6 w-full">
              {detailProduct?.imagePreview.slice(0, 5).map((item) => (
                <img
                  src={item.img}
                  className="w-[4.43rem] h-[5rem] cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Pr*/}
          <ProductInfoCard product={detailProduct} />
        </div>

        <div>
          <ProductTab />
        </div>
      </div>

      <div>
        <PayCard
          percent={detailProduct?.percent}
          price={detailProduct?.price}
        />
      </div>
    </div>
  );
};
export default DetailProduct;
