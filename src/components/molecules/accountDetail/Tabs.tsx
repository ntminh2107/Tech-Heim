import { User } from "../../../types/User";

import { useNavigate } from "react-router-dom";

interface sideBarItem {
  lable: string;
  imgSrc: string;
  navigate: string;
  active?: boolean;
}

const sideBarItems: sideBarItem[] = [
  {
    lable: "Payment & Installments",
    imgSrc: "../../../../public/assets/icons/user/dollar-circle.svg",
    navigate: "/paymentinstallments",
  },
  {
    lable: "Orders",
    imgSrc: "../../../../public/assets/icons/user/bag.svg",
    navigate: "/order",
  },
  {
    lable: "Wish Lists",
    imgSrc: "../../../../public/assets/icons/user/heart.svg",
    navigate: "wishlist",
  },
  {
    lable: "Discounts",
    imgSrc: "../../../../public/assets/icons/user/gift.svg",
    navigate: "discount",
  },
  {
    lable: "Security & Access",
    imgSrc: "../../../../public/assets/icons/user/security-safe.svg",
    navigate: "securityaccess",
  },
  {
    lable: "Notification",
    imgSrc: "../../../../public/assets/icons/user/notification.svg",
    navigate: "notification",
  },
  {
    lable: "Contact Us",
    imgSrc: "../../../../public/assets/icons/user/24-support.svg",
    navigate: "contactus",
  },
];
type Props = {
  user: User | null;
  classname?: string;
};

const MenuUser = ({ user, classname }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={`${classname} bg-gray-F9F9F9 flex flex-col w-fit`}>
      <div className="flex flex-row gap-4 cursor-pointer p-5 hover:text-primary">
        <img
          src="/assets/icons/user/profile_icon.svg"
          className="object-cover p-0.5"
        />
        <div className="text-xl font-medium content-center">
          {user?.fullName}
        </div>
      </div>
      {sideBarItems.map((item) => (
        <>
          <div
            className="flex flex-row gap-4 cursor-pointer p-5 hover:text-primary"
            key={item.lable}
            onClick={() => navigate(item.navigate)}
          >
            <img src={item.imgSrc} className="object-cover p-0.5" />
            <div className="text-xl font-light">{item.lable}</div>
          </div>
        </>
      ))}
    </div>
  );
};
export default MenuUser;
