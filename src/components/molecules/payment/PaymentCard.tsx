import React, { useEffect } from 'react'
import { Button, Divider } from 'antd'

import { cn } from '../../../utils/utils'
import { formatNumber } from '../../../utils/formatNumber'
import { Order } from '../../../types/Order'

type Props = {
  children?: React.ReactNode
  className?: string
  buttonLabel: string
  onClick?: () => void
  setGrandTotal?: React.Dispatch<React.SetStateAction<number>>
  order: Order // Use the Order type to get necessary props
}

const PaymentCard = ({
  children,
  buttonLabel,
  onClick,
  className,
  setGrandTotal,
  order
}: Props) => {
  const total = order?.Products.reduce((res, curr) => {
    return res + curr.price * curr.quantity
  }, 0)

  const discount = order?.Products.reduce((res, curr) => {
    if (curr.salePrice) {
      return res + (curr.price - curr.salePrice) * curr.quantity
    }
    return res
  }, 0)

  const shippingCost = order.shippingPrice
  const depositAmount = order.depositAmount

  const grandTotal = total - discount + shippingCost
  const remainingAmount = grandTotal - depositAmount
  const adjustedRemainingAmount = remainingAmount < 0 ? 0 : remainingAmount
  const excessAmount = remainingAmount < 0 ? Math.abs(remainingAmount) : 0

  useEffect(() => {
    if (setGrandTotal) {
      setGrandTotal(grandTotal)
    }
  }, [discount, shippingCost, total, depositAmount, grandTotal, setGrandTotal])

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
          <span className='text-gray-717171'>Subtotal</span>
          <span className='text-gray-444444'>${formatNumber(total)}</span>
        </p>

        <p className='flex justify-between text-sm '>
          <span className='text-gray-717171'>Discount</span>
          <span className='text-gray-444444'>${formatNumber(discount)}</span>
        </p>
        <p className='flex justify-between text-sm '>
          <span className='text-gray-717171'>Shipment cost</span>
          <span className='text-gray-444444'>
            ${formatNumber(shippingCost)}
          </span>
        </p>

        <Divider className='my-3' />
        <h6 className='flex justify-between text-gray-2D2D2D font-semibold'>
          <span>Grand Total</span>
          <span>${formatNumber(grandTotal)}</span>
        </h6>
        {depositAmount > 0 && (
          <>
            <p className='flex justify-between text-sm '>
              <span className='text-gray-717171'>Deposit Amount</span>
              <span className='text-gray-444444'>
                ${formatNumber(depositAmount)}
              </span>
            </p>
            <p className='flex justify-between text-sm '>
              <span className='text-gray-717171'>Remaining Amount</span>
              <span className='text-gray-444444'>
                ${formatNumber(adjustedRemainingAmount)}
              </span>
            </p>
            {excessAmount > 0 && (
              <p className='flex justify-between text-sm text-green-500'>
                <span>Excess Amount</span>
                <span>${formatNumber(excessAmount)}</span>
              </p>
            )}
          </>
        )}
      </div>
      {order.isPaid ? (
        <div className='text-green-500 text-lg font-medium'>
          This order is already done
        </div>
      ) : (
        <Button size='large' type='primary' onClick={onClick}>
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}

export default PaymentCard
