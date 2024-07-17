import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import MenuUser from "../../components/molecules/accountDetail/Tabs";
import PersonalData from "../../components/molecules/accountDetail/PersonalData";
import { useEffect } from "react";
import { editFullnameUserThunk } from "../../redux/slice/authSlice";

const DetailUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetail = useSelector((state: RootState) => state.auth.currentUser);
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-row gap-6">
      <MenuUser user={userDetail || null} classname="basis-1/4" />
      <PersonalData classname="basis-3/4" />
    </div>
  );
};
export default DetailUser;
