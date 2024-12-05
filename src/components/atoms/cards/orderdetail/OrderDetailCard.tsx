import { useNavigate } from 'react-router-dom'
import { Order } from '../../../../types/Order'

type Props = {
  order: Order
}

const OrderDetailCard = ({ order }: Props) => {
  const navigate = useNavigate()

  const handleOpenReceipt = () => {
    if (order.transaction?.receiptURL) {
      window.open(order.transaction.receiptURL, '_blank', 'noopener,noreferrer')
    } else {
      alert('Receipt URL is not available for this order.')
    }
  }
  const keys = [
    { label: 'Order code', key: order.id },
    { label: 'Ship Method', key: order.shipMethod.detail },
    {
      label: 'Total',
      key: `$${order.total}`
    },
    { label: 'Sent to', key: order.address.fullname }
  ]
  return (
    <div className='flex flex-col bg-white p-4 rounded-lg h-full'>
      <div className='flex flex-row justify-between items-center mb-4 bg-gray-F6F6F6 rounded p-4 gap-4'>
        <div className='flex flex-row w-full basis 4/5'>
          {keys.map(({ label, key }) => (
            <div className='flex flex-col basis-1/4'>
              <div className='font-medium text-base text-center'>{label}</div>
              <div className='font-light text-lg text-center'>{key}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-center cursor-pointer basis-1/5'>
          {order.transaction ? (
            <div
              onClick={handleOpenReceipt}
              className='text-primary text-sm font-light'
            >
              Order Invoice
            </div>
          ) : (
            <div
              onClick={() => navigate(`/payment/${order.id}`)}
              className='text-primary text-sm font-light'
            >
              Continue to pay order
            </div>
          )}
        </div>
      </div>
      <div className='grid grid-cols-7 gap-5'>
        {order.orderItems.map((orderItem) => (
          <img
            key={orderItem.image}
            src={orderItem.image}
            alt={orderItem.name}
            className='object-contain h-[116px] w-[104.71px]'
          />
        ))}
      </div>
    </div>
  )
}

export default OrderDetailCard
