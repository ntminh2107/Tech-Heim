import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spin } from 'antd'
import { AppDispatch, RootState } from '../../redux/store'
import { setModalState } from '../../redux/slice/modalSlice'
import Step from '../../components/atoms/step'
import InputFormField from '../../components/atoms/formField/InputFormField'
import MapModal from '../../components/organisms/modal/MapModal'
import ChooseCardModal from '../../components/organisms/modal/ChooseCardModal'
import AddNewCardModal from '../../components/organisms/modal/AddNewCardModal'
import { SuccessModal } from '../../components/organisms/modal'
import { formatNumber } from '../../utils/formatNumber'
import { generateTransactionID } from '../../utils/orderUtils'
import { Order } from '../../types/Order'
import PaymentCard from '../../components/molecules/payment/PaymentCard'
import 'react-toastify/dist/ReactToastify.css'
import { getOrderDetailThunk } from '../../redux/slice/orderSlice'

const PaymentData = {
  orderDetail: {
    id: '5d4d591f-509a-4330-8706-fb4a6845cd7c',
    userID: '467678d7-1b86-45ee-ac21-353eb8315b2a',
    address: {
      id: 5,
      fullname: 'minh e',
      address: 'dsd',
      city: 'dasd',
      country: 'Việt Nam'
    },
    shipMethod: {
      id: 1,
      method: 'Free Shipping',
      detail: '7-30 business days',
      price: 0
    },
    status: 'pending',
    orderItems: [
      {
        id: 10,
        name: 'Dell XPS 13',
        image:
          'https://product.hstatic.net/1000331874/product/dell_xps_13_dc9a366cc90c495b9a3da844f2a08cb9.jpg',
        quantity: 1,
        price: 1399
      }
    ],
    total: 1399,
    createdAt: '2024-11-28T14:28:19.782Z',
    updatedAt: '2024-11-28T14:28:19.782Z'
  },
  stripeID: 'pi_3QQ2FuKg88uI13X41UeaonYn',
  stripeClientSecret:
    'pi_3QQ2FuKg88uI13X41UeaonYn_secret_85JAtMFKBBq15mZCOVDQlT49L'
}

const Payments = () => {
  const { orderID } = useParams<{ orderID: string }>()
  console.log('orderID:', orderID)

  const { successModal } = useSelector((state: RootState) => state.appModal)
  const { currentUser } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [orderData, setOrderData] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [paidAmount, setPaidAmount] = useState<number>(0)

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

  const handlePlaceOrder = async () => {
    if (!currentUser || !currentUser.id || !orderData) {
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
          <div className=' flex flex-col border gap-2 border-gray-CBCBCB bg-white rounded-lg py-6 px-8'>
            <h5 className='text-xl mb-2 font-semibold'>Payment</h5>
            <div className='flex gap-2'>
              <div
                className='bg-gray-F6F6F6 rounded-lg py-4 px-2 flex flex-1 justify-between'
                onClick={() => handlePaymentChange('CreditCard')}
              >
                <div className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='payment'
                    checked={selectedPayment === 'CreditCard'}
                    readOnly
                  />
                  <label>Credit Cards</label>
                </div>
                {/* <div className="flex gap-2">
                <img src={selectedCreditCard?.image} className="w-14" />
                <img
                  src="/assets/icons/email/edit_icon.svg"
                  className="w-5 cursor-pointer"
                  onClick={() => handleOpenChooseModal(true)}
                />
              </div> */}
              </div>
              <button
                className='p-3 bg-primary-25 rounded-lg'
                onClick={() => handleOpenAddModal(true)}
              >
                <span className='p-2 text-primary text-xl'>+</span>
              </button>
            </div>
            <div
              className='bg-gray-F6F6F6 rounded-lg py-4 px-2 '
              onClick={() => handlePaymentChange('PayPal')}
            >
              <input
                type='radio'
                name='payment'
                checked={selectedPayment === 'PayPal'}
                className='mr-2'
                readOnly
              />
              <label>PayPal</label>
            </div>
            <InputFormField
              label='Billing address'
              value='Same as shipping address'
              disable
              icon={
                <img
                  src='/assets/icons/email/edit_icon.svg'
                  className='w-5 cursor-pointer'
                  onClick={() => handleOpenMapModal(true)}
                />
              }
            />
            {/* {!orderData?.isPaid && (
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
          )} */}
          </div>
          <Button
            size='large'
            className='text-primary'
            type='text'
            onClick={() => navigate('/checkout')}
          >
            Return to checkout
          </Button>
        </div>
        <div className='basis-2/5'>
          <PaymentCard
            buttonLabel='Place order'
            onClick={handlePlaceOrder}
            order={PaymentData.orderDetail as Order}
          >
            {/* <OrderList cartItems={orderData?.Products || []} /> */}
          </PaymentCard>
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
