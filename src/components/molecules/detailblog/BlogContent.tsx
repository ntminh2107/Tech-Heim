import { Blog } from '../../../types/Blog'
import dayjs from 'dayjs'
type Props = {
  detailBlogPost: Blog | null
}

const BlogContent = ({ detailBlogPost }: Props) => {
  return (
    <div>
      <div className='border-b-2 pb-4'>
        <div className='mt-4' key={detailBlogPost?.id}>
          <h5 className='font-medium text-xl'>{detailBlogPost?.title}</h5>
          <div className='mt-4 text-xs text-[#717171]'>
            By {detailBlogPost?.author} on{' '}
            {dayjs(detailBlogPost?.releaseDate).format('DD-MM-YYYY')}
          </div>
        </div>
        <div className='mt-4'>
          <img
            src={detailBlogPost?.image}
            className='h-[25.8rem] w-[50.5rem] rounded-lg'
          />
        </div>

        <div
          className='prose font-light text-xl mt-4'
          dangerouslySetInnerHTML={{
            __html: detailBlogPost?.content as string
          }}
        />
      </div>
    </div>
  )
}

export default BlogContent
