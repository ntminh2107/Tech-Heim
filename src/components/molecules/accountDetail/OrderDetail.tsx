import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import OrderDetailCard from "../../atoms/cards/orderdetail/OrderDetailCard";

const OrderDetail = () => {
  const bill = useSelector((state: RootState) => state.auth.currentUser?.bill);
  return (
    <div className="flex flex-col gap-4 ">
      {bill?.map((order) => (
        <OrderDetailCard order={order} />
      ))}
    </div>
  );
};
export default OrderDetail;
