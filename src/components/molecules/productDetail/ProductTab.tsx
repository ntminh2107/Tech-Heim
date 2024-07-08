import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ProductDescription } from ".";

const ProductTab = () => {
  const productDes = useSelector(
    (state: RootState) => state.product.detailProduct
  );
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Technical Details" key="1">
          <ProductDescription product={productDes} />
        </TabPane>
        <TabPane tab="Similar Product" key="2"></TabPane>
        <TabPane tab="Comments" key="3"></TabPane>
      </Tabs>
    </div>
  );
};
export default ProductTab;
