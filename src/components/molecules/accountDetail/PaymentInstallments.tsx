import { Input } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";

const PaymentInstallments = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div>Card</div>
      <div>manage payment methods</div>
      <div className="flex flex-row justify-between">
        <Input disabled={true} />
        <img />
      </div>
    </div>
  );
};

export default PaymentInstallments;
