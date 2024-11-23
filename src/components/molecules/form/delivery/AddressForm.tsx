import { Form, FormInstance, FormProps, Input } from 'antd'

type FieldType = {
  fullName: string
  phoneNumber: string
  address: string
  district: string
  city: string
  country: string
}
const AddressForm = ({
  form,
  onSave
}: {
  form: FormInstance
  onSave: (values: FieldType) => void
}) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)

    onSave(values)
  }
  return (
    <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item<FieldType>
        name='fullName'
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input size='large' placeholder='Full name' />
      </Form.Item>

      <Form.Item<FieldType>
        name='phoneNumber'
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input size='large' placeholder='Phone number' />
      </Form.Item>

      <Form.Item<FieldType>
        name='address'
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input size='large' placeholder='Street name and house number' />
      </Form.Item>

      <div className='flex gap-4'>
        <Form.Item<FieldType>
          name='district'
          rules={[{ required: true, message: 'Please input your district!' }]}
          className='flex-1'
        >
          <Input size='large' placeholder='district' />
        </Form.Item>

        <Form.Item<FieldType>
          name='city'
          rules={[{ required: true, message: 'Please input your city!' }]}
          className='flex-1'
        >
          <Input size='large' placeholder='city' />
        </Form.Item>
      </div>
      <Form.Item<FieldType>
        name='country'
        rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <Input size='large' placeholder='Country' />
      </Form.Item>
    </Form>
  )
}

export default AddressForm
