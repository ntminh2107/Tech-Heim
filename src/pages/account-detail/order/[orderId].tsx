import OrderStatusDetail from "../../../components/molecules/accountDetail/order/OrderStatusDetail";

const OrderDetailID = () => {
  return (
    <div className="mb-10">
      <div className="text-xl font-medium">Order status</div>
      <div className="text-base font-light text-gray-717171">
        Track your order
      </div>
      <div className="justify-center">
        <OrderStatusDetail />
      </div>
    </div>
  );
};
export default OrderDetailID;
