import { useState } from "react";
import { Product } from "../../../types/Product";

type Props = {
  product: Product | null;
};

const ProductDescription = ({ product }: Props) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="flex flex-col w-2/3">
      <div className="font-medium text-xl">Technical Details</div>
      <table className="w-full text-left border-collapse">
        <tbody>
          {product?.specifications
            .slice(0, showMore ? product?.specifications.length : 6)
            .map((spec, index) => (
              <tr
                key={spec.key}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 rounded-md"
                    : "bg-white rounded-md"
                }
              >
                <th className="py-2 px-4 text-gray-500 capitalize border border-gray-200 w-1/2">
                  {spec.key}
                </th>
                <td className="py-2 px-4 border border-gray-200 w-1/2">
                  {spec.value}
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
