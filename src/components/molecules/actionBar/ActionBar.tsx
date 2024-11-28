import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

import { AppDispatch, RootState } from '../../../redux/store'
import { setModalState } from '../../../redux/slice/modalSlice'
import ProfileMenu, { CartDropdown } from '../../atoms/dropdown'
import { AuthModal, SearchModal } from '../../organisms/modal'
import ErrorModal from '../../organisms/modal/ErrorModal'
import { cn } from '../../../utils/utils'

const ActionBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const token = localStorage.getItem('token')
  const { authModal, searchModal, errorModal } = useSelector(
    (state: RootState) => state.appModal
  )

  const handleToggleModalAuth = (isOpen: boolean) => {
    dispatch(
      setModalState({
        key: 'authModal',
        isOpen: isOpen
      })
    )
  }

  const handleToggleModalSearch = (isOpen: boolean) => {
    dispatch(
      setModalState({
        key: 'searchModal',
        isOpen: isOpen
      })
    )
  }

  const handleToggleModalError = (isOpen: boolean) => {
    dispatch(
      setModalState({
        key: 'errorModal',
        isOpen: isOpen
      })
    )
  }

  return (
    <>
      <div className='flex items-center gap-2 my-5 py-2'>
        <Button
          className='border-none shadow-none hidden md:block'
          onClick={() => handleToggleModalSearch(true)}
          type='text'
          icon={
            <img src='/assets/icons/search/search_icon.svg' alt='search_icon' />
          }
        />

        {token && (
          <>
            <div className={cn('md:p-2 md:block', !isLoggedIn && 'hidden')}>
              <CartDropdown />
            </div>
          </>
        )}
        {token ? (
          <>
            <ProfileMenu />
          </>
        ) : (
          <>
            <Button
              className='md:block hidden self-center'
              type='primary'
              onClick={() => handleToggleModalAuth(true)}
            >
              Login / Sign Up
            </Button>
            <Button
              type='text'
              className='text-primary font-inter flex items-center md:hidden'
              icon={<img src='/assets/icons/arrow/login_icon.svg' alt='' />}
            >
              Login
            </Button>
          </>
        )}
      </div>

      {authModal && (
        <AuthModal open={authModal} setOpen={handleToggleModalAuth} />
      )}

      {searchModal && (
        <SearchModal isOpen={searchModal} setIsOpen={handleToggleModalSearch} />
      )}

      {errorModal && (
        <ErrorModal
          title='Oops'
          message='Unfortunately, there was a problem during creating your account. try again later.'
          isOpen={true}
          setIsOpen={handleToggleModalError}
        />
      )}
    </>
  )
}

export default ActionBar
