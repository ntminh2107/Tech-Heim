import { useParams } from 'react-router-dom'
import PayCard from '../../components/atoms/cards/productdetails/PayCard'
import ProductInfoCard from '../../components/atoms/cards/productdetails/ProductInfoCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import ProductTab from '../../components/molecules/productDetail/ProductTab'
import ImagePreview from '../../components/atoms/image/ImagePreview'
import VideoBlogCarousel from '../../components/molecules/blog/VideoBlogCarousel'
import { getProductDetailThunk } from '../../redux/slice/productSlice'

const Product = () => {
  const { id } = useParams()
  const idProduct = Number(id)
  const dispatch = useDispatch<AppDispatch>()

  // Track if the effect has been triggered once
  const [hasDispatched, setHasDispatched] = useState(false)

  const { product } = useSelector((state: RootState) => state.product)
  const { listvideoBlogsPost } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    if (id && !hasDispatched) {
      // Ensure that dispatch only runs once for the given id
      dispatch(getProductDetailThunk(idProduct))
      setHasDispatched(true) // Set to true to prevent repeated dispatches for the same id
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className='flex flex-col gap-8 mb-14'>
      <div className='flex xl:flex-row flex-col gap-8 mb-8 justify-around'>
        <div className='flex lg:flex-row flex-col gap-6'>
          <div className='xl:basis-3/5 lg:basis-1/2'>
            <ImagePreview imageUrl={product?.imagePreview as string[]} />
          </div>
          <div className='xl:basis-2/5 lg:basis-1/2'>
            <ProductInfoCard product={product} key={product?.id} />
          </div>
        </div>
        <PayCard
          percent={product?.price?.percent as number}
          price={product?.price?.price as number}
          id={product?.id as number}
        />
      </div>
      <ProductTab />

      <div>
        <VideoBlogCarousel videoBlog={listvideoBlogsPost} />
      </div>
    </div>
  )
}

export default Product
