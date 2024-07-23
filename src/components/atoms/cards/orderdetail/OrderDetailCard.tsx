import { useNavigate } from "react-router-dom";
import { Bill } from "../../../../types/User";

type Props = {
  order: Bill;
};

const OrderDetailCard = ({ order }: Props) => {
  const navigate = useNavigate();
  const keys = [
    { label: "Order code", key: order.id },
    { label: "Ship Method", key: order.shippingMethod },
    { label: "Total", key: `$${order.amountPaid.toFixed(2)}` },
    { label: "Sent to", key: order.fullname },
  ];
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg h-full">
      <div className="flex flex-row justify-between items-center mb-4 bg-gray-F6F6F6 rounded p-4 gap-4">
        <div className="flex flex-row w-full basis 4/5">
          {keys.map(({ label, key }) => (
            <div className="flex flex-col basis-1/4">
              <div className="font-medium text-base text-center">{label}</div>
              <div className="font-light text-lg text-center">{key}</div>
            </div>
          ))}
        </div>
        <div
          className="flex flex-row justify-center cursor-pointer basis-1/5"
          onClick={() => navigate(`${order.id}`)}
        >
          <div className="text-primary text-sm font-light">Order Status</div>
          <img
            src="/assets/icons/arrow/arrow_right_blue_icon.svg"
            alt="orderStatus"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-5">
        {order.products.map((images) => (
          <img
            key={images.image}
            src={images.image}
            alt={images.name}
            className="object-fill h-[116px] w-[104.71px]"
          />
        ))}
      </div>
    </div>
  );
};

export default OrderDetailCard;
