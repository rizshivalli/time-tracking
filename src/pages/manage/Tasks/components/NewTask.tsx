import { ProModal } from '@/common';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import type { FC } from 'react';

interface NewTaskModalProps {
  visible: boolean;
  setVisibility: any;
}
const NewTask: FC<NewTaskModalProps> = ({ visible, setVisibility }) => {
  const [form] = ProForm.useForm();
  return (
    <ProModal
      title="New Task"
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
        <ProFormText name="task_name" label="Task Name" width="lg" />

        <ProFormCheckbox.Group
          layout="vertical"
          label=""
          name="types"
          options={[
            {
              label: ' This is a common task, and should be added to all future projects',
              value: 'a',
            },
            {
              label: ' Add this task to all existing projects',
              value: 'b',
            },
          ]}
        />
      </ProForm>
    </ProModal>
  );
};

export default NewTask;
