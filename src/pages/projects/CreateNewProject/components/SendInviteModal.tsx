import { ProModal, ProSpace } from '@/common';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { Button, Form, Input } from 'antd';
import React from 'react';

const { Item, List } = Form;

interface SendInviteProps {
  visible: boolean;
  setVisibility: any;
}
const SendInvite: FC<SendInviteProps> = ({ visible, setVisibility }) => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log('Received values of form:', value);
  };

  const onReset = () => {
    setVisibility(false);
    form.resetFields();
  };

  return (
    <ProModal
      visible={visible}
      title="Invite People to Project"
      footer={false}
      width={640}
      destroyOnClose
    >
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <List name="invites">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <ProSpace key={field.key} align="center">
                  <Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area || prevValues.invites !== curValues.invites
                    }
                  >
                    {() => (
                      <Item
                        {...field}
                        label="First Name"
                        name={[field.name, 'first_name']}
                        fieldKey={[field.fieldKey, 'first_name']}
                        rules={[{ required: true, message: 'First Name required' }]}
                      >
                        <Input />
                      </Item>
                    )}
                  </Item>
                  <Item
                    {...field}
                    label="Last Name"
                    name={[field.name, 'last_name']}
                    fieldKey={[field.fieldKey, 'last_name']}
                    rules={[{ required: true, message: 'Last Name required' }]}
                  >
                    <Input />
                  </Item>
                  <Item
                    {...field}
                    label="Email"
                    name={[field.name, 'work_email']}
                    fieldKey={[field.fieldKey, 'work_email']}
                    rules={[{ required: true, message: 'Work Email required', type: 'email' }]}
                  >
                    <Input />
                  </Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </ProSpace>
              ))}

              <Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Another
                </Button>
              </Item>
            </>
          )}
        </List>

        <Item>
          <ProSpace>
            <Button type="primary" htmlType="submit">
              Invite More People
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Cancel
            </Button>
          </ProSpace>
        </Item>
      </Form>
    </ProModal>
  );
};

export default SendInvite;
