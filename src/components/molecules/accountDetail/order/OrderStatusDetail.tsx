import { useParams } from "react-router-dom";
import OrderStatusDetailCard from "../../../atoms/cards/orderdetail/OrderStatusDetailCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const OrderStatusDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useSelector((state: RootState) =>
    state.auth.currentUser?.bill?.find((bill) => bill.id == orderId)
  );
  const keys = [
    { label: "Order code", value: `#${order?.id}` },
    { label: "Person receive", value: order?.fullname },
    { label: "Sent to", value: `${order?.street}, ${order?.city}` },
    { label: "Payment type", value: order?.paymentType },
    { label: "Transaction id", value: order?.paymentTransaction },
    { label: "Amount Paid", value: `$${order?.amountPaid.toFixed(2)}` },
  ];
  return (
    <div>
      <OrderStatusDetailCard />

      <div>
        <table className="w-full">
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
        <div className="flex flex-col gap-[10px] mt-5 bg-white divide-y divide-gray-CBCBCB">
          {order?.products.map((product) => (
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
                    <span className="text-gray-2D2D2D">
                      ${product.salePrice}
                    </span>{" "}
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
    </div>
  );
};
export default OrderStatusDetail;
