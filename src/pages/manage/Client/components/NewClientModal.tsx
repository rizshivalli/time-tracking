import { ProIntlProvider, ProModal } from '@/common';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useCallback } from 'react';
import type { FC } from 'react';
import { createClient } from '../service';
import { Modal } from 'antd';

interface NewClientModalProps {
  visible: boolean;
  setVisibility: any;
  onSuccess: () => void;
}
const NewClientModal: FC<NewClientModalProps> = ({ visible, setVisibility, onSuccess }) => {
  const [form] = ProForm.useForm();

  const onClientCreated = () => {
    if (onSuccess) {
      onSuccess();
    }
    setVisibility(false);
  };

  const handleFinish = useCallback(async (values) => {
    await createClient(values)
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Client Created Successfully.',
            onOk: onClientCreated,
          });
        }
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);

  return (
    <ProModal
      title="New Client"
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setVisibility(false)}
      width={540}
      footer={false}
    >
      <ProIntlProvider>
        <ProForm
          onFinish={(values) => {
            handleFinish(values);
            return Promise.resolve();
          }}
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
          <ProFormText
            name="name"
            label="Client Name"
            width="lg"
            rules={[{ required: true, message: 'Please enter a client name!' }]}
          />
          <ProFormTextArea width="lg" name="address" label="Address" />
        </ProForm>
      </ProIntlProvider>
    </ProModal>
  );
};

export default NewClientModal;
