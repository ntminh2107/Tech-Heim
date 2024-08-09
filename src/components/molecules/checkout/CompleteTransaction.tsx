import { CheckCircleOutlined } from "@ant-design/icons";
import { Order } from "../../../types/Order";
import { Tag } from "antd";

type Props = {
  order: Order | null;
};

const CompleteTransaction = ({ order }: Props) => {
  return (
    <div>
      <table className="w-full text-left font-light border-b-2 ">
        <tr className="text-base font-medium">
          <th>Transaction ID</th>
          <th>Person</th>
          <th>Amount</th>
          <th>Timeline</th>
          <th>Status</th>
        </tr>
        {order?.payments.map((payment) => (
          <tr className="text-base font-light ">
            <td className="py-3">{payment.id}</td>
            <td className="py-3">{payment.fullname}</td>
            <td className="py-3">{payment.amountPaid}</td>
            <td className="py-3">{payment.paidTime} </td>
            <td className="py-3">
              <Tag icon={<CheckCircleOutlined />} color="success">
                success
              </Tag>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default CompleteTransaction;
