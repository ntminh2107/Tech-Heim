import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Spin } from "antd";
import { AppDispatch, RootState } from "../../redux/store";
import { setModalState } from "../../redux/slice/modalSlice";

import OrderList from "../../components/organisms/order/OrderList";
import Step from "../../components/atoms/step";
import InputFormField from "../../components/atoms/formField/InputFormField";
import MapModal from "../../components/organisms/modal/MapModal";
import ChooseCardModal from "../../components/organisms/modal/ChooseCardModal";
import AddNewCardModal from "../../components/organisms/modal/AddNewCardModal";
import { SuccessModal } from "../../components/organisms/modal";
import { formatNumber } from "../../utils/formatNumber";
import { generateTransactionID } from "../../utils/orderUtils";
import { clearCartItemThunk } from "../../redux/slice/productSlice";
import {
  paidOrderThunk,
  getOrderDetailThunk,
  getUserDetailThunk,
} from "../../redux/slice/orderSlice";

import { Order, Payment } from "../../types/Order";
import { v4 as uuidv4 } from "uuid";
import PaymentCard from "../../components/molecules/payment/PaymentCard";
import { Bill, User } from "../../types/User";
import { addPaymentCardAndOrderThunk } from "../../redux/slice/authSlice";
import { sendMessageToSW } from "../../utils/serviceWorketUtils";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const detailOrder = useSelector(
    (state: RootState) => state.order.detailOrder
  );
  const { mapModal, chooseCardModal, addNewCardModal, successModal } =
    useSelector((state: RootState) => state.appModal);
  const { selectedCreditCard, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [noti, setNoti] = useState(true); // State cho số tiền thanh toán
  const onclickTest = () => {
    toast.error("hi", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetailThunk(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (detailOrder) {
      setOrderData(detailOrder);
      setLoading(false); // Set loading to false when detailOrder is available
    }
  }, [detailOrder]);

  const handleOpenMapModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: "mapModal", isOpen: isOpen }));
  };

  const handleOpenChooseModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: "chooseCardModal", isOpen: isOpen }));
  };

  const handleOpenAddModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: "addNewCardModal", isOpen: isOpen }));
  };

  const handleOpenSuccessModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: "successModal", isOpen: isOpen }));
  };

  const [selectedPayment, setSelectedPayment] = useState("CreditCard");
  const [grandTotal, setGrandTotal] = useState(0);

  const handlePaymentChange = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePlaceOrder = async () => {
    if (!currentUser || !currentUser.id || !orderData) {
      console.error("User or order data missing.");
      return;
    }

    const newPayment: Payment = {
      id: uuidv4(),
      userId: currentUser.id,
      fullname: currentUser.fullName,
      amountPaid: paidAmount, // Sử dụng paidAmount từ input
      paidTime: new Date().toISOString(),
    };

    const updatedAmountPaid =
      orderData.payments.reduce(
        (total, payment) => total + payment.amountPaid,
        0
      ) + paidAmount;

    const updatedOrder: Order = {
      ...orderData,
      depositAmount: updatedAmountPaid,
      isPaid: updatedAmountPaid >= orderData.totalAmount,
      payments: [...(orderData.payments || []), newPayment],
    };

    await dispatch(
      paidOrderThunk({ id: orderData.id!, currentOrder: updatedOrder })
    );

    const orderToBill = { ...updatedOrder, Products: orderData.Products }; // Ensure Products are included

    if (orderToBill.isPaid) {
      const newBill: Bill = {
        id: orderToBill.id!,
        fullname: orderToBill.fullname,
        street: orderToBill.street,
        city: orderToBill.city,
        region: orderToBill.region,
        postalcode: orderToBill.postalcode,
        shippingMethod: orderToBill.shippingMethod,
        shippingPrice: orderToBill.shippingPrice,
        products: orderToBill.Products,
        change: orderToBill.depositAmount - orderToBill.totalAmount,
        grandTotal: orderToBill.totalAmount,
        sharedWith: orderToBill.payments,
      };

      const updatedUserBills = async () => {
        const updateUserPromise = orderToBill.payments.map(async (payment) => {
          const userResponse = await dispatch(
            getUserDetailThunk(payment.userId)
          ).unwrap();
          const user = userResponse.data as User;

          const updatedUser: User = {
            ...user,
            bill: [...(user.bill || []), newBill],
          };

          return dispatch(
            addPaymentCardAndOrderThunk({
              id: updatedUser.id,
              currentUser: updatedUser,
            })
          );
        });

        try {
          await Promise.all(updateUserPromise);
          alert("Bill has been saved for all users!");
        } catch (error) {
          console.error("Error updating user bills: ", error);
        }
      };

      await updatedUserBills();

      dispatch(clearCartItemThunk());
      toast.warn("done"); // handleOpenSuccessModal(true);
    } else {
      const orderLink = `${window.location.origin}/payment/${orderId}`;
      navigator.clipboard.writeText(orderLink).then(() => {
        alert("Payment link copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (orderId) {
        dispatch(getOrderDetailThunk(orderId));
      }

      if (noti) {
        sendMessageToSW({
          title: "Order Completed",
          message: "Your payment has been successfully completed!",
          userIds: detailOrder?.payments.map((Payment) => Payment.userId) as (
            | string
            | number
          )[],
        });
        setNoti(false);
      }

      const currentOrder = detailOrder;
      if (currentOrder?.isPaid && !orderData?.isPaid) {
        alert("The order has been fully paid!");

        clearInterval(interval);
      }

      setOrderData(currentOrder || null);
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, orderData, dispatch, detailOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-lg mx-auto mb-12">
        <Step
          current={2}
          iconCart={<img src="/assets/icons/shopping/cart_finish_icon.svg" />}
          iconCheckout={
            <img src="/assets/icons/shopping/checkout_finish_icon.svg" />
          }
          iconPayment={
            <img src="/assets/icons/shopping/payment_active_icon.svg" />
          }
        />
      </div>
      <div className="flex flex-col lg:flex-row px-6 lg:px-20 gap-6 mb-14">
        <div className="basis-3/5">
          <div className=" flex flex-col border gap-2 border-gray-CBCBCB bg-white rounded-lg py-6 px-8">
            <h5 className="text-xl mb-2 font-semibold">Payment</h5>
            <div className="flex gap-2">
              <div
                className="bg-gray-F6F6F6 rounded-lg py-4 px-2 flex flex-1 justify-between"
                onClick={() => handlePaymentChange("CreditCard")}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === "CreditCard"}
                    readOnly
                  />
                  <label>Credit Cards</label>
                </div>
                <div className="flex gap-2">
                  <img src={selectedCreditCard?.image} className="w-14" />
                  <img
                    src="/assets/icons/email/edit_icon.svg"
                    className="w-5 cursor-pointer"
                    onClick={() => handleOpenChooseModal(true)}
                  />
                </div>
              </div>
              <button
                className="p-3 bg-primary-25 rounded-lg"
                onClick={() => handleOpenAddModal(true)}
              >
                <span className="p-2 text-primary text-xl">+</span>
              </button>
            </div>
            <div
              className="bg-gray-F6F6F6 rounded-lg py-4 px-2 "
              onClick={() => handlePaymentChange("PayPal")}
            >
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "PayPal"}
                className="mr-2"
                readOnly
              />
              <label>PayPal</label>
            </div>
            <InputFormField
              label="Billing address"
              value="Same as shipping address"
              disable
              icon={
                <img
                  src="/assets/icons/email/edit_icon.svg"
                  className="w-5 cursor-pointer"
                  onClick={() => handleOpenMapModal(true)}
                />
              }
            />
            {!orderData?.isPaid && (
              <div className="mt-4">
                <h5 className="text-xl mb-2 font-semibold">Paid Amount</h5>
                <Input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  min={0.5}
                  max={
                    orderData
                      ? orderData.totalAmount - orderData.depositAmount
                      : 0
                  }
                  placeholder="Enter amount to pay"
                />
              </div>
            )}
          </div>
          <Button
            size="large"
            className="text-primary"
            type="text"
            onClick={() => navigate("/checkout")}
          >
            Return to checkout
          </Button>
        </div>
        <div className="basis-2/5">
          <PaymentCard
            setGrandTotal={setGrandTotal}
            buttonLabel="Place order"
            onClick={handlePlaceOrder}
            order={orderData as Order}
          >
            <OrderList cartItems={orderData?.Products || []} />
          </PaymentCard>
          <Button onClick={() => toast("hello")}></Button>
        </div>
      </div>
      {mapModal && (
        <MapModal isOpen={mapModal} setIsOpen={handleOpenMapModal} />
      )}
      {chooseCardModal && (
        <ChooseCardModal
          isOpen={chooseCardModal}
          setIsOpen={handleOpenChooseModal}
        />
      )}
      {addNewCardModal && (
        <AddNewCardModal
          isOpen={addNewCardModal}
          setIsOpen={handleOpenAddModal}
        />
      )}
      {successModal && (
        <SuccessModal
          title="Successful Payment"
          isOpen={successModal}
          setIsOpen={handleOpenSuccessModal}
        >
          <div className="flex flex-col gap-4">
            <p className="text-base text-gray-717171 flex justify-between">
              <span>Payment type</span>
              <span>
                {selectedPayment === "CreditCard" ? "Credit Card" : "PayPal"}
              </span>
            </p>
            <p className="text-base text-gray-717171 flex justify-between">
              <span>Phone number</span>
              <span>{currentUser?.phoneNumber}</span>
            </p>
            <p className="text-base text-gray-717171 flex justify-between">
              <span>Email</span>
              <span>{currentUser?.email}</span>
            </p>
            <p className="text-base text-gray-717171 flex justify-between">
              <span>Transaction id</span>
              <span>{generateTransactionID()}</span>
            </p>
            <p className="text-base font-semibold text-gray-717171 flex justify-between">
              <span>Amount Paid</span>
              <span>${formatNumber(grandTotal)}</span>
            </p>
            <Button
              onClick={() => navigate("/")}
              className="w-1/2 self-end"
              type="primary"
              size="large"
            >
              Order Status
            </Button>
          </div>
        </SuccessModal>
      )}
    </>
  );
};

export default Payment;
