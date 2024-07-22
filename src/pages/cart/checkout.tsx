import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { AppDispatch, RootState } from "../../redux/store";
import { setModalState } from "../../redux/slice/modalSlice";
import PaymentCard from "../../components/molecules/payment/PaymentCard";
import OrderList from "../../components/organisms/order/OrderList";
import Step from "../../components/atoms/step";
import InputFormField from "../../components/atoms/formField/InputFormField";
import MapModal from "../../components/organisms/modal/MapModal";

import AddressModal from "../../components/organisms/modal/AddressModal";
import RadioFormField from "../../components/atoms/formField/RadioFormField";

const Checkout = () => {
  const { cartItems, shipCost } = useSelector(
    (state: RootState) => state.product
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { mapModal, addressModal } = useSelector(
    (state: RootState) => state.appModal
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const initialShipmentData = () => {
    const savedShipmentData = localStorage.getItem("shipmentData");
    if (savedShipmentData) {
      return JSON.parse(savedShipmentData);
    } else {
      return {
        fullname: currentUser?.fullName || "",
        phonenumber: "",
        street: "",
        city: "",
        region: "",
        postalcode: "",
        recipient: "",
        rePhone: "",
        shippingMethod: shipCost?.label || "",
        shippingPrice: shipCost?.price || 0,
      };
    }
  };

  const [shipmentData, setShipmentData] = useState(initialShipmentData);

  useEffect(() => {
    // Clear localStorage if the route is not related to checkout
    if (
      !location.pathname.startsWith("/checkout") &&
      !location.pathname.startsWith("/payment")
    ) {
      localStorage.removeItem("shipmentData");
    }
  }, [location]);

  const handleOpenMapModal = (isOpen: boolean) => {
    dispatch(
      setModalState({
        key: "mapModal",
        isOpen: isOpen,
      })
    );
  };

  const handleOpenAddressModal = (isOpen: boolean) => {
    dispatch(
      setModalState({
        key: "addressModal",
        isOpen: isOpen,
      })
    );
  };

  const handleAddressSubmit = (address: any) => {
    const updatedShipmentData = {
      ...shipmentData,
      ...address,
    };
    setShipmentData(updatedShipmentData);
    localStorage.setItem("shipmentData", JSON.stringify(updatedShipmentData));
  };

  const handleContinueToPay = () => {
    const updatedShipmentData = {
      ...shipmentData,
      shippingMethod: shipCost?.label,
      shippingPrice: shipCost?.price,
    };
    setShipmentData(updatedShipmentData);
    localStorage.setItem("shipmentData", JSON.stringify(updatedShipmentData));
    navigate("/payment");
  };

  return (
    <>
      <div className="max-w-lg mx-auto mb-12">
        <Step
          current={1}
          iconCart={<img src="/assets/icons/shopping/cart_finish_icon.svg" />}
          iconCheckout={
            <img src="/assets/icons/shopping/checkout_active_icon.svg" />
          }
          iconPayment={
            <img src="/assets/icons/shopping/payment_wait_icon.svg" />
          }
        />
      </div>
      <div className="flex px-20 gap-6 mb-14">
        <div className="basis-3/5">
          <div className=" flex flex-col border gap-8 border-gray-CBCBCB rounded-lg py-6 px-8">
            <InputFormField
              label="User"
              value={currentUser?.fullName}
              disable
            />

            <InputFormField
              label="Ship to"
              value={`${shipmentData.street}, ${shipmentData.city}, ${shipmentData.region}, ${shipmentData.postalcode}`}
              disable
              icon={
                <img
                  src="/assets/icons/email/edit_icon.svg"
                  className="w-5 cursor-pointer"
                  onClick={() => handleOpenAddressModal(true)}
                />
              }
            ></InputFormField>

            <RadioFormField
              label="Shipping Method"
              value={shipCost?.price as number}
            />
          </div>
          <Button
            size="large"
            className="text-primary"
            type="text"
            onClick={handleContinueToPay}
          >
            Continue to pay
          </Button>
        </div>
        <div className="basis-2/5">
          <PaymentCard
            buttonLabel="Continue to pay"
            onClick={handleContinueToPay}
            children={<OrderList cartItems={cartItems} />}
          />
        </div>
      </div>
      {mapModal && (
        <MapModal isOpen={mapModal} setIsOpen={handleOpenMapModal} />
      )}
      {addressModal && (
        <AddressModal
          isOpen={addressModal}
          setIsOpen={handleOpenAddressModal}
          onSubmit={handleAddressSubmit}
        />
      )}
    </>
  );
};

export default Checkout;
