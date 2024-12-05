import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import OrderDetailCard from '../../atoms/cards/orderdetail/OrderDetailCard'

const OrderDetail = () => {
  const { orderList } = useSelector((state: RootState) => state.order)
  return (
    <div className='flex flex-col gap-4 '>
      {orderList?.map((orderDetail) => <OrderDetailCard order={orderDetail} />)}
    </div>
  )
}
export default OrderDetail
