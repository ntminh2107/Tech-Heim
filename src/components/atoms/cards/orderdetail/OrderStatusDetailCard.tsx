import { Progress, Steps } from "antd";

const OrderStatusDetailCard = () => {
  return (
    <div className="content-center">
      <div className="font-medium text-2xl text-center">50% Completed</div>
      <div className="text-center">
        <Progress
          percent={50}
          size="small"
          strokeColor="#F45E0C"
          showInfo={false}
          className="w-[200px] text-center"
        />
        <Steps
          labelPlacement="vertical"
          className="flex flex-row items-center space-y-6"
          current={1}
          items={[
            {
              title: "Cart",
              icon: (
                <div className="flex w-10 h-10 justify-center">
                  <img
                    src="/assets/icons/status/cart_status_active.svg"
                    className="object-contain"
                  />
                </div>
              ),
            },
            {
              title: "processing",
              status: "process",
              icon: (
                <div className="flex w-10 h-10 justify-center">
                  <img
                    src="/assets/icons/status/loading_status.svg"
                    className="w-full h-full object-contain"
                  />
                </div>
              ),
            },
            {
              title: "on the way",
              icon: (
                <div className="flex w-10 h-10 justify-center">
                  <img
                    src="/assets/icons/status/deliver_status.svg"
                    className="w-full h-full object-contain"
                  />
                </div>
              ),
            },
            {
              title: "delivered",
              icon: (
                <div className="flex w-10 h-10 justify-center">
                  <img
                    src="/assets/icons/status/complete_status.svg"
                    className="object-contain w-full h-full"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
export default OrderStatusDetailCard;
