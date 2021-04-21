import { ProModal, ProSpace } from '@/common';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FC, useCallback } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { addMultipleTeamMembers } from '@/pages/Time/service';

const { Item, List } = Form;

interface SendInviteProps {
  visible: boolean;
  setVisibility: any;
}
const SendInvite: FC<SendInviteProps> = ({ visible, setVisibility }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    setVisibility(false);
  };
  const handleFinish = useCallback(async (values) => {
    console.log('🚀 ~ file: NewTask.tsx ~ line 25 ~ handleFinish ~ values', values);
    // setPending(true);

    await addMultipleTeamMembers(values.invites)
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Users added Successfully.',
            onOk: onFinish,
          });
        }
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);

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
        onFinish={handleFinish}
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
                    name={[field.name, 'email']}
                    fieldKey={[field.fieldKey, 'email']}
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
