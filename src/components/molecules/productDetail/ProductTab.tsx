import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { ProductDescription } from '.'
import ProductSimilarCarousel from './ProductSimilarCarousel'
import { useEffect, useState } from 'react'
import ListComment from '../comment/ListComment'
import CommentInputCard from '../../atoms/cards/comment/CommentInputCard'
import { getCommentListThunk } from '../../../redux/slice/productSlice'
import { useParams } from 'react-router-dom'

const ProductTab = () => {
  const [activeKey, setActiveKey] = useState('technical-details')
  const { id } = useParams<{ id?: string }>() ?? {}

  const { product, commentList } = useSelector(
    (state: RootState) => state.product
  )

  const handleChange = (key: string) => {
    setActiveKey(key)
    const element = document.getElementById(key)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Tabs defaultActiveKey={activeKey} onChange={handleChange}>
        <TabPane tab='Technical details' key='technical-details' />
        <TabPane tab='Similar products' key='similar-products' />
        <TabPane tab='Comments' key='comments' />
      </Tabs>
      <div id='technical-details'>
        <ProductDescription product={product} />
      </div>
      <div id='similar-products' className='mt-[46px]'>
        <ProductSimilarCarousel product={product} />
      </div>
      <div id='comments' className='mt-12 flex flex-col gap-6'>
        <div className='font-medium text-xl'>Comments</div>
        <div className='flex lg:flex-row flex-col gap-6'>
          <div className='lg:basis-1/4'>
            <CommentInputCard productID={Number(id)} />
          </div>
          <div className='lg:basis-3/4'>
            <ListComment comments={commentList} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductTab
