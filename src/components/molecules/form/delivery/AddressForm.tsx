import { Checkbox, Form, FormInstance, FormProps, Input, Select } from "antd";
type FieldType = {
  fullname?: string;
  phonenumber?: string;
  street?: string;
  city?: string;
  region?: string;
  postalcode?: string;
  commit?: string;
  recipient?: string;
  rePhone?: string;
};
const AddressForm = ({
  form,
  onSave,
}: {
  form: FormInstance;
  onSave: (values: FieldType) => void;
}) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    onSave(values);
  };
  return (
    <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item<FieldType>
        name="fullname"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input size="large" placeholder="Full name" />
      </Form.Item>
      <Form.Item<FieldType>
        name="phonenumber"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input size="large" placeholder="Phone number" />
      </Form.Item>
      <Form.Item<FieldType>
        name="street"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input size="large" placeholder="Street name and house number" />
      </Form.Item>
      <div className="flex gap-4">
        <Form.Item<FieldType>
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
          className="flex-1"
        >
          <Input size="large" placeholder="City" />
        </Form.Item>
        <Form.Item<FieldType>
          name="region"
          rules={[{ required: true, message: "Please input your region!" }]}
          className="flex-1"
        >
          <Select
            size="large"
            placeholder="Select region"
            options={[
              { value: "sea", label: "South East Asia" },
              { value: "afr", label: "Africa" },
              { value: "na", label: "North America" },
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item<FieldType>
        name="postalcode"
        rules={[{ required: true, message: "Please input your postal code!" }]}
      >
        <Input size="large" placeholder="Postal code" />
      </Form.Item>
      <Form.Item<FieldType> name="commit" valuePropName="checked">
        <Checkbox>I am the recipient of my order</Checkbox>
      </Form.Item>
      <Form.Item<FieldType>
        name="recipient"
        rules={[{ required: false, message: "Please input name!" }]}
      >
        <Input size="large" placeholder="recipient name" />
      </Form.Item>
      <Form.Item<FieldType>
        name="rePhone"
        rules={[{ required: false, message: "Please input phone!" }]}
      >
        <Input size="large" placeholder="Phone number" />
      </Form.Item>
    </Form>
  );
};

export default AddressForm;
