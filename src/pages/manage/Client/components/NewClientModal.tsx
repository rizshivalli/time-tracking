import { ProModal } from '@/common';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';
import type { FC } from 'react';

interface NewClientModalProps {
  visible: boolean;
  setVisibility: any;
}
const NewClientModal: FC<NewClientModalProps> = ({ visible, setVisibility }) => {
  const [form] = ProForm.useForm();
  return (
    <ProModal
      title="New Client"
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
            submitText: 'Save Client',
            resetText: 'Cancel',
          },
        }}
      >
        <ProFormText name="client_name" label="Client Name" width="lg" />

        <ProFormTextArea width="lg" name="address" label="Address" />
      </ProForm>
    </ProModal>
  );
};

export default NewClientModal;
