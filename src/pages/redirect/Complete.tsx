import { CheckCircleTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import DetailBill from '../../components/molecules/checkout/DetailBill'
import CompleteTransaction from '../../components/molecules/checkout/CompleteTransaction'
import { OrderWithIDStripe } from '../../types/Order'

const Complete = () => {
  const { order } = useSelector((state: RootState) => state.order)
  const [counter, setCounter] = useState(15)
  const navigate = useNavigate()

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  })
  if (counter == 0) {
    navigate('/')
  }

  const handleButton = () => {
    navigate('/')
  }

  return (
    <div className='m-20'>
      <div className='text-center'>
        <CheckCircleTwoTone
          twoToneColor='#52c41a'
          style={{ fontSize: '200px' }}
          className='mb-10'
        />
      </div>

      {order?.orderDetail.status === 'complete' ? (
        <div>
          <div className='text-4xl font-medium text-center'>
            Your order is Complete, redirecting to Home page in{' '}
            <span className='font-medium'>{counter}</span> seconds...
          </div>
          <DetailBill order={order} />
        </div>
      ) : (
        <div>
          <div className='text-4xl font-light text-center text-gray-444444'>
            Your transaction is complete redirecting to Home page in{' '}
            <span className='font-medium'>{counter}</span> seconds...
          </div>
          <CompleteTransaction order={order as OrderWithIDStripe} />
        </div>
      )}
      <div className='text-right mt-4'>
        <Button
          onClick={handleButton}
          type='link'
          className='font-light text-xl'
        >
          Click here to redirect to home page immediately
        </Button>
      </div>
    </div>
  )
}
export default Complete
