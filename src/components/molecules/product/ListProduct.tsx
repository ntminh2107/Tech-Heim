import { useState } from 'react'
import { PriceTag, Product } from '../../../types/Product'
import { cn } from '../../../utils/utils'
import ProductCard from '../../atoms/cards/product/ProductCard'
import { Pagination, Input } from 'antd'

type Props = {
  productList: Product[]
  className?: string
}

const ListProduct = ({ productList, className }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [productPerPage] = useState(9)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products based on search query
  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Calculate pagination based on filtered products
  const indexOfLastProduct = currentPage * productPerPage
  const indexOfFirstProduct = indexOfLastProduct - productPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const onPageChange = (page: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsTransitioning(false)
    }, 300)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when search query changes
  }

  return (
    <div>
      {/* Search input */}
      <div className='mb-4 mr-[125px]'>
        <Input
          placeholder='Search for products...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='w-full '
        />
      </div>

      <div
        className={cn(
          `grid gap-6 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`,
          className,
          'grid-cols-2 lg:grid-cols-3'
        )}
      >
        {currentProducts?.map((product) => {
          return (
            <ProductCard
              color={product.color}
              key={product.id}
              name={product.name}
              id={product.id}
              image={product.image}
              price={product.price as PriceTag}
              rating={product.rating as number}
            />
          )
        })}
      </div>
      <div className='flex justify-center mt-[33px] mb-14'>
        <Pagination
          current={currentPage}
          pageSize={productPerPage}
          total={filteredProducts.length}
          onChange={onPageChange}
          className='items-center'
        />
      </div>
    </div>
  )
}

export default ListProduct
