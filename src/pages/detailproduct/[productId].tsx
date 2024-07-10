import { useParams } from "react-router-dom";
import PayCard from "../../components/atoms/cards/productdetails/PayCard";
import ProductInfoCard from "../../components/atoms/cards/productdetails/ProductInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getDetailProductThunk } from "../../redux/slice/productSlice";
import ProductTab from "../../components/molecules/productDetail/ProductTab";
import ImagePreview from "../../components/atoms/image/ImagePreview";

const DetailProduct = () => {
  const { id } = useParams<{ id?: string }>() ?? {};
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(getDetailProductThunk(id));
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);

  const detailProduct = useSelector(
    (state: RootState) => state.product.detailProduct
  );
  console.log(detailProduct);

  return (
    <div>
      <div className="flex gap-8 mb-8">
        <div className="flex gap-6">
          <div className="flex-shrink w-full">
            <ImagePreview
              width="31rem"
              imageUrl={detailProduct?.image || ""}
              height="21.125rem"
              imagePreview={detailProduct?.imagePreview || null}
            />
          </div>
          <ProductInfoCard product={detailProduct} key={detailProduct?.id} />
        </div>
        <PayCard
          percent={detailProduct?.percent}
          price={detailProduct?.price}
        />
      </div>
      <ProductTab />
    </div>
  );
};
export default DetailProduct;
