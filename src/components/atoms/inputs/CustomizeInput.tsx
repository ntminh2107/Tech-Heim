import { Input } from 'antd'
import { InputProps } from 'antd/es/input'
import { FC } from 'react'

type Props = {
  className?: string
  label?: string
  placeholder?: string
  autocomplete?: string
} & InputProps

const CustomizeInput: FC<Props> = ({
  className,
  placeholder,
  label,
  autocomplete,
  ...rest
}) => {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <Input
        className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg 
        appearance-none  focus:border-primary peer'
        placeholder={placeholder ? placeholder : ''}
        autoComplete={autocomplete}
        {...rest}
      />
      {label && (
        <label className='absolute text-base font-light text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:font-light peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
          {label}
        </label>
      )}
    </div>
  )
}

export default CustomizeInput
