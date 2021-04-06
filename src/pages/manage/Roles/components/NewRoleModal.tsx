import { ProModal } from '@/common';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import type { FC } from 'react';

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

// eslint-disable-next-line no-plusplus
for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Employee Name : ${value}`,
    value,
  });
}

interface NewRoleModalProps {
  visible: boolean;
  setVisibility: any;
}

const NewRoleModal: FC<NewRoleModalProps> = ({ visible, setVisibility }) => {
  const [form] = ProForm.useForm();
  return (
    <ProModal
      title="New Role"
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setVisibility(false)}
      width={540}
      footer={false}
    >
      <ProForm
        onReset={() => {
          form.resetFields();
          setVisibility(false);
        }}
        submitter={{
          searchConfig: {
            submitText: 'Create New Role',
            resetText: 'Cancel',
          },
        }}
      >
        <ProFormText width="lg" name="role_name" label="Role Name" placeholder="Enter Role Name" />
        <ProFormSelect
          width="lg"
          mode="multiple"
          label="Who’s assigned to this role?"
          options={options}
          // @ts-ignore
          onChange={(newValue: string[]) => {
            console.log(
              '🚀 ~ file: NewRoleModal.tsx ~ line 51 ~ NewRoleModal ~ newValue',
              newValue,
            );
            //   setValue(newValue);
          }}
          placeholder="Please select a employee"
          rules={[{ required: true, message: 'Please select an employee!' }]}
        />
      </ProForm>
    </ProModal>
  );
};

export default NewRoleModal;
