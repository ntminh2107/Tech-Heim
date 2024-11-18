import { Tag } from 'antd'

type CategoryProps = {
  tags?: string[]
}

const BlogCategorieslist = ({ tags }: CategoryProps) => {
  return (
    <div className='mt-4'>
      <p className='font-medium text-xl'>Categories</p>
      <div className='mt-6 gap-4 flex lg:flex-col flex-wrap'>
        {tags &&
          tags.map((category) => (
            <>
              <div className='font-light text-xl hidden lg:block'>
                {category}
              </div>
              <Tag
                className='block lg:hidden cursor-pointer'
                color='processing'
              >
                {category}
              </Tag>
            </>
          ))}
      </div>
    </div>
  )
}
export default BlogCategorieslist
