import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import OrderDetailCard from '../../atoms/cards/orderdetail/OrderDetailCard'
import { Pagination } from 'antd'

const OrderDetail = () => {
  const { orderList } = useSelector((state: RootState) => state.order)

  // Set up pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3 // Customize page size as needed

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Paginate orderList based on current page and page size
  const paginatedOrders = orderList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <>
      {orderList && (
        <div className='flex flex-col gap-4'>
          {paginatedOrders.map((orderDetail) => (
            <OrderDetailCard key={orderDetail.id} order={orderDetail} />
          ))}

          <Pagination
            current={currentPage}
            total={orderList.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false} // Disable size changer if not needed
            style={{ marginTop: '20px' }}
          />
        </div>
      )}
    </>
  )
}

export default OrderDetail
