import { CheckCircleTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import DetailBill from "../../components/molecules/checkout/DetailBill";

const Complete = () => {
  const { detailOrder } = useSelector((state: RootState) => state.order);
  const [counter, setCounter] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  });
  if (counter == 0) {
    navigate("/");
  }

  const handleButton = () => {
    navigate("/");
  };

  return (
    <div className="text-center mt-20">
      <CheckCircleTwoTone
        twoToneColor="#52c41a"
        style={{ fontSize: "200px" }}
        className="mb-10"
      />
      {detailOrder?.isPaid ? (
        <div>
          <div className="text-4xl font-medium text-center">
            Your order is Complete, redirecting to Home page in{" "}
            <span className="font-medium">{counter}</span> seconds...
          </div>
          <DetailBill order={detailOrder} />
        </div>
      ) : (
        <div className="text-4xl font-light text-center text-gray-444444">
          Your transaction is complete redirecting to Home page in{" "}
          <span className="font-medium">{counter}</span> seconds...
        </div>
      )}

      <Button onClick={handleButton} type="link">
        Click here to redirect to home page immediately
      </Button>
    </div>
  );
};
export default Complete;
