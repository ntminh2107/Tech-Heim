import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button } from 'antd'

import ActionBar from '../actionBar'
import Navbar from '../navbar'
import SearchBox from '../searchBox'

import { AppDispatch } from '../../../redux/store'

import {
  getBestSellerProductListThunk,
  getBrandListThunk,
  getCategoriesListThunk,
  getNewProductsListThunk,
  getSaleProductListThunk
} from '../../../redux/slice/productSlice'
import {
  getListBlogThunk,
  getListNewBlogsThunk,
  getListVideoBlogsThunk
} from '../../../redux/slice/blogSlice'
import { getUserDetailThunk } from '../../../redux/slice/authSlice'
import MenuSlider from '../../atoms/MenuSlider'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false)

  //TODO: Add dispatch
  useEffect(() => {
    dispatch(getNewProductsListThunk())
    dispatch(getBestSellerProductListThunk())
    dispatch(getBrandListThunk())
    dispatch(getListBlogThunk())
    dispatch(getListNewBlogsThunk())
    dispatch(getListVideoBlogsThunk())
    dispatch(getSaleProductListThunk())
    dispatch(getCategoriesListThunk())
    if (token) {
      dispatch(getUserDetailThunk())
    }
  }, [dispatch])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const onHandleClickMenuButton = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className='flex justify-between items-center py-2 md:py-0 px-1 md:px-6 lg:px-28 md:h-[100px] h-10'>
        <img
          src='/assets/images/logo.svg'
          alt='Logo'
          className='hidden md:block md:h-full md:py-5'
        />

        <Button
          className='block md:hidden border-none'
          onClick={onHandleClickMenuButton}
          icon={<img src='/assets/icons/essential/menu_icon.svg' alt='menu' />}
        />

        <h1 className='block md:hidden text-primary-400'>Tech Heim</h1>
        <Navbar />
        <ActionBar />
      </header>
      <MenuSlider isOpen={isOpen} />
      <div className='gradient hidden md:block' />
      <div className='mt-3 md:hidden'>
        <SearchBox />
      </div>
    </>
  )
}

export default Header
