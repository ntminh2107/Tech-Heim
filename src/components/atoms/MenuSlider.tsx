type Props = {
  isOpen: boolean
}

const MenuSlider = ({ isOpen }: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-gray-F6F6F6 shadow-lg mt-[40px] z-20 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full overflow-hidden'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className='p-4'>
        <ul>
          <li className='mb-5'>
            <a
              href='/'
              className='font-medium text-xl text-gray-2D2D2D hover:text-gray-717171'
            >
              Home
            </a>
          </li>
          <li className='mb-5'>
            <a
              href='/products/categories/laptop'
              className='font-medium text-xl text-gray-2D2D2D hover:text-gray-717171'
            >
              Products
            </a>
          </li>
          <li className='mb-5'>
            <a
              href='/blog'
              className='font-medium text-xl text-gray-2D2D2D hover:text-gray-717171'
            >
              Blog
            </a>
          </li>
          <li className='mb-5'>
            <a
              href='/faq'
              className='font-medium text-xl text-gray-2D2D2D hover:text-gray-717171'
            >
              FAQ
            </a>
          </li>
          <li className='mb-5'>
            <a
              href='/contact-us'
              className='font-medium text-xl text-gray-2D2D2D hover:text-gray-717171'
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuSlider
