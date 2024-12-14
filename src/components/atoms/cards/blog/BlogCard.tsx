import { useNavigate } from 'react-router-dom'
import { cn } from '../../../../utils/utils'
import { Skeleton } from 'antd'
import dayjs from 'dayjs'

type BlogProps = {
  mode?: 'horizontal' | 'vertical'
  className?: string
  id: string
  title: string
  releaseDate: Date
  readTime: string
  content: string
  author: string
  image: string
  loading: boolean
}

const BlogCard = ({
  mode = 'vertical',
  className,
  id,
  title,
  releaseDate,
  readTime,
  content,
  image,
  loading
}: BlogProps) => {
  const nav = useNavigate()
  console.log(releaseDate)

  const handleClick = () => {
    nav(`/blog/${id}`)
  }

  return (
    <div
      key={id}
      className={cn(mode === 'vertical' ? 'w-1/3' : 'w-full h-44', className)}
      onClick={handleClick}
    >
      <div
        className={cn(
          'bg-white flex group shadow-md rounded-lg overflow-hidden h-full gap-2 cursor-pointer',
          mode === 'vertical' ? 'flex-col ' : 'flex-row'
        )}
      >
        {loading ? (
          <>
            <Skeleton.Image
              className={cn(
                'object-contain w-full h-full',
                mode === 'vertical' ? 'h-[204px]' : 'w-1/3 flex-shrink-0'
              )}
            />
            <div
              className={cn(
                'pb-5 px-5 flex flex-col',
                mode === 'horizontal' && 'justify-center pt-5 basis-2/3'
              )}
            >
              <Skeleton paragraph={{ rows: 4 }} active />
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                mode === 'vertical' ? 'h-[204px]' : 'w-1/3 flex-shrink-0'
              )}
            >
              <img
                className='object-cover h-full w-full'
                src={image}
                alt={title}
              />
            </div>

            <div
              className={cn(
                'pb-5 px-5 flex flex-col',
                mode === 'horizontal' && 'justify-center pt-5 basis-2/3'
              )}
            >
              <div
                className={cn(
                  'flex justify-between pb-2',
                  mode === 'horizontal' && 'order-last'
                )}
              >
                {mode === 'vertical' && (
                  <div className='flex items-center text-xs text-gray-9E9E9E'>
                    <img
                      src='/assets/icons/time/timer_icon.svg'
                      alt=''
                      className='h-4 w-4 mr-1'
                    />
                    <p>{readTime}</p>
                  </div>
                )}
              </div>
              <h5
                className={cn(
                  'font-semibold font-inter line-clamp-1 tracking-tight mb-2 group-hover:text-secondary',
                  mode === 'vertical' ? 'text-gray-900 text-xl' : ' text-base'
                )}
              >
                {title}
              </h5>

              <p
                className={cn(
                  '!font-normal mb-3 max-h-12 line-clamp-2 ',
                  mode === 'vertical'
                    ? 'black text-base'
                    : 'text-gray-717171 text-sm'
                )}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: content
                  }}
                />
              </p>

              <div className='flex justify-between'>
                <div className='flex items-center text-xs text-gray-9E9E9E'>
                  <img
                    src='/assets/icons/time/calender_icon.svg'
                    alt=''
                    className='h-4 w-4 mr-1'
                  />
                  <p>{dayjs(releaseDate).format('YYYY-MM-DD')}</p>
                </div>
                <div className='text-xs text-gray-9E9E9E hidden group-hover:block'>
                  <img
                    src='/assets/icons/archive/save_icon.svg'
                    alt=''
                    className='h-4 w-4 mr-1'
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BlogCard
