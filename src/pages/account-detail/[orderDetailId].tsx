import OrderDetail from "../../components/molecules/accountDetail/OrderDetail";

const OrderDetailPage = () => {
  return (
    <div className="mb-10">
      <div className="font-medium text-xl">Order History</div>
      <div className="font-light text-base text-gray-717171 mb-10">
        Track, return or purchase items
      </div>
      <OrderDetail />
    </div>
  );
};

export default OrderDetailPage;
