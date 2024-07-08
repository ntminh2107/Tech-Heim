import { useParams } from "react-router-dom";
import PayCard from "../../components/atoms/cards/PayCard";
import ProductInfoCard from "../../components/atoms/cards/ProductInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getDetailProductThunk } from "../../redux/slice/productSlice";

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
      <div className="flex flex-row gap-6">
        <div>
          <img src="/assets/images/blog/blog1.png" className="w-96 h-96" />
        </div>
        <ProductInfoCard product={detailProduct} />
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
