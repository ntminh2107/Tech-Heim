import React, { useEffect } from 'react'
import { Button, Divider } from 'antd'
import { cn } from '../../../utils/utils'
import { formatNumber } from '../../../utils/formatNumber'
import { CartItem } from '../../../types/Cart'

type Props = {
  children?: React.ReactNode
  className?: string
  buttonLabel: string
  onClick?: () => void
  setGrandTotal?: React.Dispatch<React.SetStateAction<number>>
  depositAmount?: number
  shippingCost?: number
  shipCost?: number
  cartItems?: CartItem[]
}

const PaymentCartCard = ({
  children,
  buttonLabel,
  onClick,
  className,
  setGrandTotal,
  cartItems,
  shipCost,
  depositAmount = 0
}: Props) => {
  console.log('cartItems; ', cartItems)
  const total = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shippingCost = shipCost ?? 0 // Default to 0 if shipCost is null or undefined
  const grandTotal: number = (total as number) + shippingCost

  useEffect(() => {
    if (setGrandTotal) {
      setGrandTotal(grandTotal)
    }
  }, [shippingCost, total, depositAmount])

  return (
    <div
      className={cn(
        'flex flex-col h-fit gap-10 border border-gray-EDEDED rounded-lg px-6 py-4 bg-white',
        className
      )}
    >
      {children}
      <div>
        <p className='flex justify-between text-sm '>
          <span className='text-gray-717171'>Total</span>
          <span className='text-gray-444444'>${formatNumber(total)}</span>
        </p>

        <p className='flex justify-between text-sm '>
          <span className='text-gray-717171'>Shipment cost</span>
          <span className='text-gray-444444'>
            {shippingCost ? `$${formatNumber(shippingCost)}` : `$ ${0.0}`}
          </span>
        </p>

        <Divider className='my-3' />
        <h6 className='flex justify-between text-gray-2D2D2D font-semibold'>
          <span>Grand Total</span>
          <span>${formatNumber(grandTotal)}</span>
        </h6>
      </div>

      <Button size='large' type='primary' onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  )
}

export default PaymentCartCard
