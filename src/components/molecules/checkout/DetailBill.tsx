import { Tag } from "antd";
import { Order } from "../../../types/Order";
import { CheckCircleOutlined } from "@ant-design/icons";

type Props = {
  order: Order;
};

const DetailBill = ({ order }: Props) => {
  const keys = [
    { label: "Order ID", value: `#${order.id}` },
    { label: "Person receive", value: order.fullname },
    { label: "Address", value: `${order?.street}, ${order?.city}` },
    { label: "Shipping price", value: `$${order.shippingPrice}` },
    { label: "Total", value: `$${order.totalAmount.toFixed(2)}` },
    { label: "Paid", value: `$${order.depositAmount}` },
  ];

  return (
    <div className="mt-10">
      <div className="text-2xl font-medium">Your Order Status Complete </div>
      <table className="w-full border-b-2">
        <tbody>
          {keys.map((item, index) => (
            <tr
              key={item.label}
              className={
                index % 2 === 0
                  ? "bg-gray-100 rounded-md"
                  : "bg-white rounded-md"
              }
            >
              <th className="text-left w-1/2 px-3 py-[18.5px] font-medium text-base">
                {item.label}
              </th>
              <td className="text-left w-1/2 px-3 py-4 font-light text-base text-gray-444444">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-2xl font-medium mb-4">Transaction history</div>
      <table className="w-full text-left font-light border-b-2 ">
        <tr className="text-base font-medium">
          <th>transaction ID</th>
          <th>Person</th>
          <th>amount</th>
          <th>Timeline</th>
          <th>Status</th>
        </tr>
        {order.payments.map((payment) => (
          <tr className="text-base font-light ">
            <td className="py-3">{payment.id}</td>
            <td className="py-3">{payment.fullname}</td>
            <td className="py-3">{payment.amountPaid}</td>
            <td className="py-3">{payment.paidTime}</td>
            <td className="py-3">
              <Tag icon={<CheckCircleOutlined />} color="success">
                success
              </Tag>
            </td>
          </tr>
        ))}
      </table>
      <div className="flex flex-col gap-[10px] mt-5 bg-white divide-y divide-gray-CBCBCB border-b-2">
        {order?.Products.map((product) => (
          <div className="flex flex-row p-[6px] gap-[6px] h-full ">
            <div className="w-[87px] h-[74px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 font-light text-xs w-full">
              <div className="text-gray-2D2D2D">{product.name}</div>
              <div className="font-medium text-[10px] text-gray-717171">
                <div>{product.color}</div>
                <div>x{product.quantity}</div>
              </div>
              {product.salePrice ? (
                <div className="w-full text-right text-gray-717171">
                  <span className="text-gray-2D2D2D">${product.salePrice}</span>{" "}
                  from ${product.price}
                </div>
              ) : (
                <div className="w-full text-right text-gray-2D2D2D">
                  ${product.price}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DetailBill;
