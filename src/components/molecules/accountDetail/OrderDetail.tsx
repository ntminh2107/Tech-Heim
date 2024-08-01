import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import OrderDetailCard from "../../atoms/cards/orderdetail/OrderDetailCard";

const OrderDetail = () => {
  const bills = useSelector((state: RootState) => state.auth.currentUser?.bill);
  return (
    <div className="flex flex-col gap-4 ">
      {bills?.map((order) => (
        <OrderDetailCard bill={order} />
      ))}
    </div>
  );
};
export default OrderDetail;
