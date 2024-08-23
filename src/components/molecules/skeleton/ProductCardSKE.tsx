import { Skeleton } from "antd";

const ProductCardSKE = () => {
  return (
    <div className="flex flex-row gap-6">
      <div className="basis-1/4">
        <Skeleton paragraph={{ rows: 5 }} />
      </div>
      <div className="w-full basis-3/4">
        <div className="grid grid-cols-3 gap-3">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="relative rounded-md bg-white  sm:w-full
                md:w-52 lg:w-50 xl:w-72 h-auto flex flex-col gap-3 shadow-md group hover:shadow-lg cursor-pointer p-4"
              >
                <Skeleton.Image className=" object-contain size-fit w-full h-40 md:h-32 lg:h-48" />
                <div className="gradient-black mx-2"></div>
                <div className="flex-1 flex flex-col justify-between pb-2 px-2">
                  <Skeleton paragraph={{ rows: 2 }} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ProductCardSKE;
