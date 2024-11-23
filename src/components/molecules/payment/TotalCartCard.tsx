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
  cartItems?: CartItem[]
}

const TotalCartCard = ({
  children,
  buttonLabel,
  onClick,
  className,
  setGrandTotal,
  cartItems
}: Props) => {
  console.log(cartItems)

  const total = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const grandTotal = total

  useEffect(() => {
    if (setGrandTotal) {
      setGrandTotal(total as number)
    }
  }, [grandTotal, setGrandTotal])

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
          <span className='text-gray-717171'>total</span>
          <span className='text-gray-444444'>${formatNumber(total)}</span>
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

export default TotalCartCard
