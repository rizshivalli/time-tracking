import { ProIntlProvider, ProModal } from '@/common';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import React, { useCallback } from 'react';
import type { FC } from 'react';
import { Modal } from 'antd';
import { createTask } from '../service';

interface NewTaskModalProps {
  visible: boolean;
  setVisibility: any;
}

const NewTask: FC<NewTaskModalProps> = ({ visible, setVisibility }) => {
  const [form] = ProForm.useForm();

  const onTaskCreated = () => {
    setVisibility(false);
  };

  const handleFinish = useCallback((values) => {
    console.log('🚀 ~ file: NewTask.tsx ~ line 13 ~ values', values);
    // setPending(true);

    createTask(values)
      .then((result) => {
        Modal.success({
          title: 'Success',
          content: 'Task Created Successfully.',
          onOk: onTaskCreated,
        });
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);
  return (
    <ProModal
      title="New Task"
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
          <ProFormText name="task_name" label="Task Name" width="lg" />

          <ProFormCheckbox.Group
            width="lg"
            layout="horizontal"
            label=""
            name="types"
            options={[
              {
                label: 'This is a common task, and should be added to all future projects',
                value: 'a',
              },
              {
                label: 'Add this task to all existing projects',
                value: 'b',
              },
            ]}
          />
        </ProForm>
      </ProIntlProvider>
    </ProModal>
  );
};

export default NewTask;
