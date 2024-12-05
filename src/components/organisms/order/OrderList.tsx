import { Button, Input } from 'antd'
import OrderCard from '../../atoms/cards/cart/OrderCard'
import { CartItem } from '../../../types/Cart'

type Props = {
  cartItems: CartItem[]
}

const OrderList = ({ cartItems }: Props) => {
  return (
    <div>
      <h4 className='font-inter font-semibold text-2xl mb-4'>Your Order</h4>
      {cartItems.map((item) => {
        return (
          <OrderCard
            color={item.color || ''}
            name={item.name}
            price={item.price * item.quantity}
            quantity={item.quantity}
            key={item.id}
            image={item.image}
          />
        )
      })}
    </div>
  )
}

export default OrderList
