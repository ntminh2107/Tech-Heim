import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ProductDescription } from ".";
import ProductSimilarCarousel from "./ProductSimilarCarousel";
import { useState } from "react";
import ListComment from "../comment/ListComment";

const ProductTab = () => {
  const [activeKey, setActiveKey] = useState("technical-details");
  const productDes = useSelector(
    (state: RootState) => state.product.detailProduct
  );

  const handleChange = (key: string) => {
    setActiveKey(key);
    const element = document.getElementById(key);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Tabs defaultActiveKey={activeKey} onChange={handleChange}>
        <TabPane tab="Technical details" key="technical-details" />
        <TabPane tab="Similar products" key="similar-products" />
        <TabPane tab="Comments" key="comments" />
      </Tabs>
      <div id="technical-details">
        <ProductDescription product={productDes} />
      </div>
      <div id="similar-products" className="mt-[46px]">
        <ProductSimilarCarousel product={productDes} />
      </div>
      <div id="comments" className="mt-12 flex gap-6">
        <div className="basis-1/3"></div>
        <div className="basis-2/3">
          <ListComment comments={productDes?.comment} />
        </div>
      </div>
    </div>
  );
};
export default ProductTab;
