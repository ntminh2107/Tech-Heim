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
            color={item.color}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            key={item.id}
            image={item.image}
            salePrice={item?.salePrice}
          />
        )
      })}
      <div className='flex gap-1 pt-6'>
        <Input
          className='basis-2/3 border-gray-B4B4B4'
          size='large'
          placeholder='discount code'
        />
        <Button
          className='basis-1/3 text-primary border-primary border-2'
          size='large'
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

export default OrderList
