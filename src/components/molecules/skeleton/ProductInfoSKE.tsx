import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";

const ProductInfoSKE = () => {
  return (
    <div className="flex xl:flex-row flex-col gap-8 mb-8">
      <div className="flex lg:flex-row flex-col gap-6">
        <div className="xl:basis-3/5 lg:basis-1/2">
          <SkeletonImage />
        </div>
        <div className="xl:basis-2/5 lg:basis-1/2">
          <Skeleton />
        </div>
      </div>
      <Skeleton />
    </div>
  );
};
export default ProductInfoSKE;
