import { useSelector } from 'react-redux'

import ImgAndNameCard from '../../atoms/cards/ImgAndNameCard'
import CarouselWithButton from '../../atoms/carousel/CarouselWithButton'

import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'

const CategoryCarousel = () => {
  const { listCategory } = useSelector((state: RootState) => state.product)

  const nav = useNavigate()

  const handleRedirect = (categoryName) => {
    nav(`/products/categories/${categoryName}`)
  }
  return (
    <section className='py-6 md:py-12 my-3'>
      <CarouselWithButton slideToShow={6}>
        {listCategory?.map((item) => {
          return (
            <ImgAndNameCard
              key={item.id}
              onClick={() => handleRedirect(item.categoryName)}
              name={item.categoryName}
              img={`/assets/icons/device/${item.categoryName}.svg`}
              className='my-3'
            />
          )
        })}
      </CarouselWithButton>
    </section>
  )
}

export default CategoryCarousel
