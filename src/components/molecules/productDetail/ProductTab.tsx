import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ProductDescription } from ".";
import ProductSimilarCarousel from "./ProductSimilarCarousel";

const ProductTab = () => {
  const productDes = useSelector(
    (state: RootState) => state.product.detailProduct
  );

  const handleChange = (key: string) => {
    const element = document.getElementById(key);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={handleChange}>
        <TabPane tab="Technical details" key="technical-details" />
        <TabPane tab="Similar products" key="similar-products" />
        <TabPane tab="Comments" key="comments" />
      </Tabs>
      <div id="technical-details">
        <ProductDescription product={productDes} />
      </div>
      <div id="similar-products" className="mt-[46px]">
        <ProductSimilarCarousel brand={productDes?.brand} />
      </div>
    </div>
  );
};
export default ProductTab;
