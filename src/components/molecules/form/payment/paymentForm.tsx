/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button, Input, Spin, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { addTransactionThunk } from '../../../../redux/slice/orderSlice'
import { deleteCartThunk } from '../../../../redux/slice/cartSlice'
import { useNavigate } from 'react-router-dom'
import { setModalState } from '../../../../redux/slice/modalSlice'

type PaymentFormProps = {
  stripeClientSecret: string
  orderTotal: number
  orderDetail: any // Adjust the type based on your data structure
  onSuccess?: () => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  stripeClientSecret,
  orderTotal,
  orderDetail,
  onSuccess
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentUser } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [postalCode, setPostalCode] = useState('')

  const handleChangePostalCode = (e: any) => {
    setPostalCode(e.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) {
      message.error('Stripe.js has not loaded yet!')
      return
    }

    const cardNumberElement = elements.getElement(CardNumberElement)

    if (!cardNumberElement) {
      message.error('Payment fields are not fully loaded!')
      return
    }

    setIsLoading(true)

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        stripeClientSecret,
        {
          receipt_email: currentUser?.email,
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: orderDetail.address.fullname,
              email: currentUser?.email,
              address: {
                city: orderDetail.address.city,
                country: 'VN',
                line1: orderDetail.address.address,
                postal_code: postalCode // Replace with the actual postal code if needed
              }
            }
          }
        }
      )

      if (error) {
        message.error(`Payment failed: ${error.message}`)
      } else if (paymentIntent?.status === 'succeeded') {
        await dispatch(
          addTransactionThunk({
            orderID: orderDetail.id,
            stripePaymentIntentID: paymentIntent.id
          })
        )
        await dispatch(deleteCartThunk())
        dispatch(
          setModalState({
            key: 'successModal',
            isOpen: true
          })
        )
        navigate('/')
        message.success('Payment succeeded!')

        onSuccess && onSuccess()
      }
    } catch (err) {
      message.error('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full mx-auto p-6 bg-white shadow-md rounded-lg'>
      <h3 className='text-lg font-semibold mb-4'>Complete Payment</h3>
      <p className='text-sm mb-4'>
        Amount to pay: <strong>${orderTotal.toFixed(2)}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-1 text-sm font-medium'>Card Number</label>
          <div className='border rounded p-2'>
            <CardNumberElement
              onReady={(el) => el.focus()}
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    letterSpacing: '0.025em',
                    fontFamily: 'Source Code Pro, monospace',
                    '::placeholder': { color: '#aab7c4' }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block mb-1 text-sm font-medium'>
              Expiration Date
            </label>
            <div className='border rounded p-2'>
              <CardExpiryElement
                onReady={(el) => el.focus()}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      letterSpacing: '0.025em',
                      fontFamily: 'Source Code Pro, monospace',
                      '::placeholder': { color: '#aab7c4' }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label className='block mb-1 text-sm font-medium'>CVV</label>
            <div className='border rounded p-2'>
              <CardCvcElement
                onReady={(el) => el.focus()}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      letterSpacing: '0.025em',
                      fontFamily: 'Source Code Pro, monospace',
                      '::placeholder': { color: '#aab7c4' }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm font-medium'>Postal code</label>
          <Input
            placeholder='Postal code'
            onChange={handleChangePostalCode}
            className='border rounded p-2 text-base text-[#424770] tracking-[0.025em] font-source-code-pro placeholder:text-[#aab7c4]'
          />
        </div>
        <Button
          type='primary'
          htmlType='submit'
          block
          size='large'
          loading={isLoading}
          disabled={!stripe}
        >
          {isLoading ? <Spin /> : `Pay ${orderTotal.toFixed(2)}$ now`}
        </Button>
      </form>
    </div>
  )
}

export default PaymentForm
