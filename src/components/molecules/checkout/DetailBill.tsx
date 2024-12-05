import { Tag } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
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

const DetailBill = ({ order }: Props) => {
  const keys = [
    { label: 'Order ID', value: `#${order.orderDetail.id}` },
    { label: 'Person receive', value: order.orderDetail.address.fullname },
    {
      label: 'Address',
      value: `${order.orderDetail.address.address}, ${order.orderDetail.address.city}`
    },
    {
      label: 'Shipping price',
      value: `$${order.orderDetail.shipMethod.price}`
    },
    { label: 'Total', value: `$${order.orderDetail.total.toFixed(2)}` },
    { label: 'Paid', value: `$${order.orderDetail.transaction?.amount}` }
  ]

  return (
    <div className='mt-10'>
      <div className='text-2xl font-medium'>Your Order Status Complete </div>
      <table className='w-full border-b-2'>
        <tbody>
          {keys.map((item, index) => (
            <tr
              key={item.label}
              className={
                index % 2 === 0
                  ? 'bg-gray-100 rounded-md'
                  : 'bg-white rounded-md'
              }
            >
              <th className='text-left w-1/2 px-3 py-[18.5px] font-medium text-base'>
                {item.label}
              </th>
              <td className='text-left w-1/2 px-3 py-4 font-light text-base text-gray-444444'>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-2xl font-medium mb-4'>Transaction history</div>
      <table className='w-full text-left font-light border-b-2 '>
        <tr className='text-base font-medium'>
          <th>transaction ID</th>
          <th>Person</th>
          <th>amount</th>
          <th>Timeline</th>
          <th>Status</th>
        </tr>

        <tr className='text-base font-light '>
          <td className='py-3'>{order.orderDetail.transaction?.id}</td>
          <td className='py-3'>{order.orderDetail.address.fullname}</td>
          <td className='py-3'>{order.orderDetail.transaction?.amount}</td>
          <td className='py-3'>{formatDate(order.orderDetail.createdAt)}</td>
          <td className='py-3'>
            <Tag icon={<CheckCircleOutlined />} color='success'>
              success
            </Tag>
          </td>
        </tr>
      </table>
      <div className='flex flex-col gap-[10px] mt-5 bg-white divide-y divide-gray-CBCBCB border-b-2'>
        {order.orderDetail.orderItems.map((orderItem) => (
          <div className='flex flex-row p-[6px] gap-[6px] h-full '>
            <div className='w-[87px] h-[74px]'>
              <img
                src={orderItem.image}
                alt={orderItem.name}
                className='w-full h-full object-contain'
              />
            </div>
            <div className='flex flex-col gap-2 font-light text-xs w-full'>
              <div className='text-gray-2D2D2D'>{orderItem.name}</div>
              <div className='font-medium text-[10px] text-gray-717171'>
                <div>x{orderItem.quantity}</div>
              </div>

              <div className='w-full text-right text-gray-2D2D2D'>
                ${orderItem.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default DetailBill
