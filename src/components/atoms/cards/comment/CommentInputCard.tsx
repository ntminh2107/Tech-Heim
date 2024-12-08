import React, { useState } from 'react'
import { Button, Input, Rate, Form, message } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import {
  addCommentProductThunk,
  getCommentListThunk
} from '../../../../redux/slice/productSlice'

interface CommentInputProps {
  productID: number
}

const CommentInputCard: React.FC<CommentInputProps> = ({ productID }) => {
  // Local state to hold rating
  const [rating, setRating] = useState<number>(0)
  const dispatch = useDispatch<AppDispatch>()

  // Submit handler for the form
  const onFinish = async (values: { content: string }) => {
    if (rating === 0) {
      message.error('Please select a rating')
      return
    }

    const commentData = {
      productID,
      content: values.content,
      rating
    }

    try {
      // Here you would send the data to your backend API
      console.log('Submitting comment data:', commentData)
      dispatch(
        addCommentProductThunk({
          productID: productID,
          content: commentData.content,
          rating: commentData.rating
        })
      )
      dispatch(getCommentListThunk(productID))
      message.success('Comment submitted successfully!')
      setRating(0) // Reset rating
    } catch (error) {
      message.error('Failed to submit comment')
    }
  }

  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className='text-lg font-semibold'>
        Leave your comments here for other customers
      </div>

      {/* Rating component */}
      <div className='flex flex-row items-center gap-2'>
        <span className='text-sm'>Rating:</span>
        <Rate value={rating} onChange={setRating} className='text-primary' />
      </div>

      {/* Ant Design Form */}
      <Form
        name='comment_form'
        onFinish={onFinish} // Form submission handler
        layout='vertical'
        initialValues={{ content: '' }}
      >
        {/* Comment Text Area */}
        <Form.Item
          name='content'
          label='Comment'
          rules={[
            {
              required: true,
              message: 'Please share your thoughts about this product'
            }
          ]}
        >
          <Input.TextArea
            placeholder='Share your thoughts about this product here'
            autoSize={{ minRows: 3, maxRows: 4 }}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='self-end py-[14.5px] px-[107px] bg-primary text-white'
          >
            Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CommentInputCard
