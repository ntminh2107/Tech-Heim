import { Table, TableColumnsType } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { getInstalmentsThunk } from "../../../redux/slice/productSlice";

interface Instalments {
  id: number;
  productImg: string;
  cartId: string;
  dueAmount: number;
  dueDate: string;
  actualAmount?: number;
  paymentDate?: string;
  total: number;
}

const Instalments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { instalments } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getInstalmentsThunk());
  }, [dispatch]);

  const columns: ColumnsType<Instalments> = [
    {
      title: "Description",
      key: "description",
      render: (record: Instalments) => (
        <div className="flex flex-row gap-4">
          <img
            src={record.productImg}
            alt={record.cartId}
            className="object-cover max-w-[60px] max-h-[54px]"
          />
          <div className="text-lg font-light ">{record.cartId}</div>
        </div>
      ),
    },
    {
      title: "Due amount",
      key: "dueAmount",
      render: (amount: number) => (
        <div className="text-lg font-light text-secondary items-center">
          {amount.toFixed(2)}
        </div>
      ),
    },
    {
      title: "Due date",
      key: "",
    },
  ];
  return <Table columns={columns} className="columns"></Table>;
};

export default Instalments;
