import { CheckCircleOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { OrderWithIDStripe } from '../../../types/Order'

type Props = {
  order: OrderWithIDStripe
}

function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is 0-based
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}
const CompleteTransaction = ({ order }: Props) => {
  return (
    <div>
      <table className='w-full text-left font-light border-b-2 '>
        <tr className='text-base font-medium'>
          <th>Transaction ID</th>
          <th>Person</th>
          <th>Amount</th>
          <th>Timeline</th>
          <th>Status</th>
        </tr>

        <tr className='text-base font-light '>
          <td className='py-3'>{order.orderDetail.transaction?.id}</td>
          <td className='py-3'>{order.orderDetail.address.fullname}</td>
          <td className='py-3'>{order.orderDetail.transaction?.amount}</td>
          <td className='py-3'>{formatDate(order.orderDetail.createdAt)} </td>
          <td className='py-3'>
            <Tag icon={<CheckCircleOutlined />} color='success'>
              success
            </Tag>
          </td>
        </tr>
      </table>
    </div>
  )
}
export default CompleteTransaction
