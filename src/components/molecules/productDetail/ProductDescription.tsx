import { useState } from "react";
import { Product } from "../../../types/Product";

type Props = {
  product: Product | null;
};

const ProductDescription = ({ product }: Props) => {
  const displayKeys: (keyof Product)[] = [
    "brand",
    "screenSize",
    "processor",
    "GPU",
    "memory",
    "categoryId",
    "color",
    "description",
    "name",
  ];

  const [showMore, setShowMore] = useState(false);
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="flex flex-col w-2/3">
      <div className="font-medium text-xl">Technical Details</div>
      <table className="w-full text-left border-collapse">
        <tbody>
          {displayKeys
            .slice(0, showMore ? displayKeys.length : 6)
            .map((key, index) => (
              <tr
                key={key}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 rounded-md"
                    : "bg-white rounded-md"
                }
              >
                <th className="py-2 px-4 text-gray-500 capitalize border border-gray-200 w-1/2">
                  {key}
                </th>
                <td className="py-2 px-4 border border-gray-200 w-1/2">
                  {renderValue(product?.[key])}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-row" onClick={handleShowMore}>
        <a className="font-light text-sm text-primary content-end py-1 pl-1">
          {showMore ? "Show less" : "Show more"}
        </a>
        <img
          src="/assets/icons/arrow/arrow_down_blue_icon.svg"
          className={`transform transition-transform duration-300 ${
            showMore ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
};
export default ProductDescription;
