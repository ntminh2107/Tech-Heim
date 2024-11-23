/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from 'antd'
import AddressForm from '../../molecules/form/delivery/AddressForm'

type ModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSubmit: (address: any) => void
}

const AddressModal = ({ isOpen, setIsOpen, onSubmit }: ModalProps) => {
  const [form] = Form.useForm()
  const handleSave = (values: any) => {
    if (onSubmit) {
      onSubmit(values)
    }
  }
  return (
    <Modal
      className='max-w-[800px]'
      title={<h4 className='text-2xl'>Address details</h4>}
      centered
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={() => (
        <div className='flex gap-2'>
          <Button
            size='large'
            className='flex-1'
            onClick={() => setIsOpen(false)}
          >
            Back
          </Button>
          <Button
            size='large'
            className='flex-1'
            type='primary'
            htmlType='submit'
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        </div>
      )}
    >
      <p className='text-base text-gray-717171 mb-3'>Enter your details</p>
      <AddressForm form={form} onSave={handleSave} />
    </Modal>
  )
}

export default AddressModal
