/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Radio, Space } from 'antd'
import { AppDispatch, RootState } from '../../redux/store'

import Step from '../../components/atoms/step'
import InputFormField from '../../components/atoms/formField/InputFormField'

import AddressModal from '../../components/organisms/modal/AddressModal'
import { RadioMethodCard } from '../../components/atoms/formField/RadioFormField'
import PaymentCartCard from '../../components/molecules/payment/PaymentCartCard'
import OrderList from '../../components/organisms/order/OrderList'
import { useEffect, useState } from 'react'
import { setModalState } from '../../redux/slice/modalSlice'
import {
  addAddressThunk,
  deleteSelectedAddressThunk,
  getAddressListThunk
} from '../../redux/slice/authSlice'
import { addOrderThunk } from '../../redux/slice/orderSlice'

const Checkout = () => {
  const { cart } = useSelector((state: RootState) => state.cart)
  const cartItems = cart?.cartItems
  const { addressList } = useSelector((state: RootState) => state.auth)
  const { shipCostList } = useSelector((state: RootState) => state.order)
  const { addressModal } = useSelector((state: RootState) => state.appModal)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [selectedMethod, setSelectedMethod] = useState<number | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)

  const handleOpenAddressModal = (isOpen: boolean) => {
    dispatch(setModalState({ key: 'addressModal', isOpen: isOpen }))
  }

  const handleShippingChange = (methodId: number, price: number) => {
    setSelectedMethod(methodId)
    setSelectedPrice(price)
  }

  const handleAddressChange = (addressID: number) => {
    setSelectedAddress(addressID)
  }

  const handleAddressSubmit = async (values: any) => {
    try {
      // Dispatch the addAddressThunk with the appropriate data structure
      await dispatch(
        addAddressThunk({
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          address: values.address,
          district: values.district,
          city: values.city,
          country: values.country
        })
      )

      // Fetch the updated address list
      await dispatch(getAddressListThunk())

      // Close the address modal and show success feedback
      dispatch(setModalState({ key: 'addressModal', isOpen: false }))
      dispatch(setModalState({ key: 'successModal', isOpen: true }))
    } catch (error) {
      console.error('Error adding address:', error)
      // Handle error, such as displaying an error modal or message
    }
  }

  const handleDeleteSelectedAddress = async (addressID: number) => {
    await dispatch(deleteSelectedAddressThunk(addressID))
    await dispatch(getAddressListThunk())
  }

  const handleAddOrder = async (addressID: number, shipMethodID: number) => {
    console.log('address: ', addressID, 'shipmethod: ', shipMethodID)

    const resultAction = await dispatch(
      addOrderThunk({ addressID: addressID, shipMethodID: shipMethodID })
    )

    if (addOrderThunk.fulfilled.match(resultAction)) {
      const orderID = resultAction.payload.data.id // Adjust according to API response

      // navigate(`/payment/${orderID}`)
      console.log('order ID created: ', orderID)
      navigate(`/payment/${orderID}`)
    } else {
      console.error('Add order failed:', resultAction.payload)
    }
  }

  useEffect(() => {
    if (selectedMethod === null && shipCostList.length > 0) {
      setSelectedMethod(shipCostList[0].id)
    }
    if (addressList.length > 0 && selectedAddress === null) {
      setSelectedAddress(addressList[0].id) // Set the first item's id as default
    }
  }, [addressList, selectedAddress, selectedMethod, shipCostList])

  console.log('ship selected: ', selectedMethod)
  console.log('address selected: ', selectedAddress)

  return (
    <>
      <div className='max-w-lg mx-auto mb-12'>
        <Step
          current={1}
          iconCart={<img src='/assets/icons/shopping/cart_finish_icon.svg' />}
          iconCheckout={
            <img src='/assets/icons/shopping/checkout_active_icon.svg' />
          }
          iconPayment={
            <img src='/assets/icons/shopping/payment_wait_icon.svg' />
          }
        />
      </div>
      <div className='flex flex-col lg:flex-row px-6 lg:px-20 gap-6 mb-14'>
        <div className='basis-3/5'>
          <div className=' flex flex-col border gap-8 border-gray-CBCBCB rounded-lg py-6 px-8'>
            <h5 className='text-xl mb-2 font-semibold'>Address</h5>

            {addressList && (
              <Radio.Group
                className='w-full'
                onChange={(e) => {
                  const selectedAddressId = e.target.value
                  const selectedAddress = addressList.find(
                    (address) => address.id === selectedAddressId
                  )
                  if (selectedAddress) handleAddressChange(selectedAddress.id)
                }}
                value={selectedAddress}
              >
                <Space direction='vertical' className='w-full'>
                  {addressList.map((address) => (
                    <div className='w-full flex justify-center'>
                      <Radio value={address.id} className='w-full'>
                        <div className='w-full'>
                          <div className='text-md mb-2 font-semibold'>
                            {address.fullname || 'no name'}
                          </div>
                          <div className='text-md mb-2'>{`${address.address}, ${address.city}, ${address.country}`}</div>
                        </div>
                      </Radio>
                      <Button
                        type='text'
                        className='p-0'
                        onClick={() => {
                          handleDeleteSelectedAddress(address.id)
                          if (selectedAddress === address.id) {
                            setSelectedAddress(null)
                          }
                        }}
                      >
                        <img
                          src='/assets/icons/essential/trash_icon.svg'
                          alt=''
                        />
                      </Button>
                    </div>
                  ))}
                </Space>
              </Radio.Group>
            )}

            <InputFormField
              label='Ship to'
              // value={
              //   shipmentData.street
              //     ? `${shipmentData.street}, ${shipmentData.city}, ${shipmentData.region}, ${shipmentData.postalcode}`
              //     : 'Shipping Address'
              // }
              disable
              icon={
                <img
                  src='/assets/icons/email/edit_icon.svg'
                  className='w-5 cursor-pointer'
                  onClick={() => handleOpenAddressModal(true)}
                />
              }
            />

            <Radio.Group
              className='w-full'
              onChange={(e) => {
                const selectedId = e.target.value
                const selected = shipCostList.find(
                  (method) => method.id === selectedId
                )
                if (selected) handleShippingChange(selected.id, selected.price)
              }}
              value={selectedMethod}
            >
              <Space direction='vertical' className='w-full'>
                {shipCostList.map((method) => (
                  <Radio value={method.id} className='w-full'>
                    <div className='w-full'>
                      <RadioMethodCard
                        label={method.method}
                        price={method.price}
                        time={method.detail}
                      />
                    </div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>
        {cart && (
          <div className='basis-2/5'>
            <PaymentCartCard
              buttonLabel='Continue to pay'
              cartItems={cartItems}
              selectedAddress={selectedAddress}
              selectedMethod={selectedMethod}
              shipCost={selectedPrice as number}
              onClick={() =>
                handleAddOrder(
                  selectedAddress as number,
                  selectedMethod as number
                )
              }
            >
              <OrderList cartItems={cartItems || []} />
            </PaymentCartCard>
          </div>
        )}
      </div>

      {addressModal && (
        <AddressModal
          isOpen={addressModal}
          setIsOpen={handleOpenAddressModal}
          onSubmit={handleAddressSubmit}
        />
      )}
    </>
  )
}

export default Checkout
