import React from 'react'
import { Button, Divider } from 'antd'

import { cn } from '../../../utils/utils'
import { formatNumber } from '../../../utils/formatNumber'
import { Order } from '../../../types/Order'

type Props = {
  children?: React.ReactNode
  className?: string
  buttonLabel: string
  onClick?: () => void
  order: Order // Use the Order type to get necessary props
}

const PaymentCard = ({
  children,
  buttonLabel,
  onClick,
  className,
  order
}: Props) => {
  const total = order.orderItems.reduce((res, curr) => {
    return res + curr.price * curr.quantity
  }, 0)

  const shippingCost = order.shipMethod.price

  const grandTotal = order.total

  return (
    <div
      className={cn(
        'flex flex-col h-fit gap-10 border.orderItemsborder.orderItemsgray-EDEDED rounded-lg px-6 py-4 bg-white',
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
      </div>
    </div>
  )
}

export default PaymentCard
