import { Layout } from "antd";
import { MenuUser } from "../components/molecules/accountDetail";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";

const AccountDetailLayout = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  return (
    <Layout className="flex flex-row gap-6">
      <MenuUser user={currentUser || null} classname="basis-1/4" />
      <div className="basis-3/4">
        <Outlet />
      </div>
    </Layout>
  );
};

export default AccountDetailLayout;
