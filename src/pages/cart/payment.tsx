import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spin } from 'antd'
import { AppDispatch, RootState } from '../../redux/store'
import { setModalState } from '../../redux/slice/modalSlice'
import Step from '../../components/atoms/step'

import { SuccessModal } from '../../components/organisms/modal'
import { formatNumber } from '../../utils/formatNumber'
import { generateTransactionID } from '../../utils/orderUtils'
import { Order } from '../../types/Order'
import PaymentCard from '../../components/molecules/payment/PaymentCard'
import 'react-toastify/dist/ReactToastify.css'
import { getOrderDetailThunk } from '../../redux/slice/orderSlice'
import OrderList from '../../components/organisms/order/OrderList'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '../../components/molecules/form/payment/paymentForm'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  'pk_test_51QOsXXKg88uI13X4K67Vh216k6UpMSI47nT3eWJF4pyM73bYwzWBHHmMj6GGy8DaCOPqfckPkzjgyAqvJDh69dR1005KaCCZTe'
)

const Payments = () => {
  const { orderID } = useParams<{ orderID: string }>()
  console.log('orderID:', orderID)

  const { successModal } = useSelector((state: RootState) => state.appModal)
  const { currentUser } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { order, loading } = useSelector((state: RootState) => state.order)

  // const [orderDetail, setOrderData] = useState<Order | null>(null)
  // const [loading, setLoading] = useState<boolean>(true)
  // const [paidAmount, setPaidAmount] = useState<number>(0)

  // useEffect(() => {
  //   if (orderID) {
  //     dispatch(getOrderDetailThunk(orderID))
  //   }
  // }, [])

  const handleOpenMapModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: 'mapModal', isOpen: isOpen }))
  }

  const handleOpenAddModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: 'addNewCardModal', isOpen: isOpen }))
  }

  const handleOpenSuccessModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: 'successModal', isOpen: isOpen }))
  }

  const [selectedPayment, setSelectedPayment] = useState('CreditCard')
  const [grandTotal, setGrandTotal] = useState(0)

  const handlePaymentChange = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod)
  }

  if (!order) {
    console.error('not found')
  }

  const handlePaymentSuccess = () => {
    console.log('Payment successful')
    // Navigate or update state as needed
  }

  const handlePlaceOrder = async () => {
    if (!currentUser || !currentUser.id || !order) {
      console.error('User or order data missing.')
      return
    }

    if (loading) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <Spin size='large' />
        </div>
      )
    }
  }

  useEffect(() => {
    if (orderID) dispatch(getOrderDetailThunk(orderID))
  }, [orderID, dispatch])

  return (
    <>
      <div className='max-w-lg mx-auto mb-12'>
        <Step
          current={2}
          iconCart={<img src='/assets/icons/shopping/cart_finish_icon.svg' />}
          iconCheckout={
            <img src='/assets/icons/shopping/checkout_finish_icon.svg' />
          }
          iconPayment={
            <img src='/assets/icons/shopping/payment_active_icon.svg' />
          }
        />
      </div>
      <div className='flex flex-col lg:flex-row px-6 lg:px-20 gap-6 mb-14'>
        <div className='basis-3/5'>
          <Elements stripe={stripePromise}>
            <div className='flex w-full h-full'>
              {order && (
                <PaymentForm
                  stripeClientSecret={order.stripeClientSecret as string}
                  orderTotal={order.orderDetail.total}
                  orderDetail={order.orderDetail}
                  onSuccess={handlePaymentSuccess}
                />
              )}
            </div>
          </Elements>{' '}
        </div>
        <div className='basis-2/5'>
          {order && (
            <PaymentCard
              buttonLabel='Place order'
              onClick={handlePlaceOrder}
              order={order.orderDetail}
            >
              <OrderList cartItems={order.orderDetail.orderItems || []} />
            </PaymentCard>
          )}
        </div>
      </div>

      {/* {addNewCardModal && (
        <AddNewCardModal
          isOpen={addNewCardModal}
          setIsOpen={handleOpenAddModal}
        />
      )} */}
      {successModal && (
        <SuccessModal
          title='Successful Payment'
          isOpen={successModal}
          setIsOpen={handleOpenSuccessModal}
        >
          <div className='flex flex-col gap-4'>
            <p className='text-base text-gray-717171 flex justify-between'>
              <span>Payment type</span>
              <span>
                {selectedPayment === 'CreditCard' ? 'Credit Card' : 'PayPal'}
              </span>
            </p>
            <p className='text-base text-gray-717171 flex justify-between'>
              <span>Phone number</span>
              <span>{currentUser?.phoneNumber}</span>
            </p>
            <p className='text-base text-gray-717171 flex justify-between'>
              <span>Email</span>
              <span>{currentUser?.email}</span>
            </p>
            <p className='text-base text-gray-717171 flex justify-between'>
              <span>Transaction id</span>
              <span>{generateTransactionID()}</span>
            </p>
            <p className='text-base font-semibold text-gray-717171 flex justify-between'>
              <span>Amount Paid</span>
              <span>${formatNumber(grandTotal)}</span>
            </p>
            <Button
              onClick={() => navigate('/redirect-to-homepage')}
              className='w-1/2 self-end'
              type='primary'
              size='large'
            >
              Order Status
            </Button>
          </div>
        </SuccessModal>
      )}
    </>
  )
}

export default Payments
