import { ProIntlProvider, ProModal } from '@/common';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';
import React, { FC, useCallback, useState } from 'react';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormTimePicker } from '@ant-design/pro-form';
import { Modal } from 'antd';
import { getProjectsForTask, getTasks, createNewTimeRecord } from '../../service';

interface NewEntryProps {
  selectedKey: string;
  visible: boolean;
  setVisibility: any;
  onSuccess: any;
  employee: any;
}
const NewEntry: FC<NewEntryProps> = ({
  selectedKey,
  visible,
  setVisibility,
  onSuccess,
  employee,
}) => {
  console.log('🚀 ~ file: NewEntry.tsx ~ line 22 ~ employee', employee);
  const [form] = ProForm.useForm();
  const [timeEntry, setTimeEntry] = useState<boolean>(false);
  const [taskOptions, setTaskOptions] = useState([]);
  const onDateChange = (date: any, dateString: string) => {
    if (date) {
      setTimeEntry(true);
    } else {
      setTimeEntry(false);
    }
  };

  const onTaskCreated = () => {
    if (onSuccess) {
      onSuccess(selectedKey);
    }
    setVisibility(false);
  };

  const handleFinish = useCallback(async (values) => {
    const newVal = { organisation_member: employee ? employee?.value : null };
    await createNewTimeRecord({
      ...values,
      ...newVal,
    })
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Task Created Successfully.',
            onOk: onTaskCreated,
          });
        }
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);

  const getTasksForClient = async (value: string) => {
    const taskList = await getTasks(value);
    const taskOptions = taskList.map((obj: any) => ({
      label: obj.name,
      value: obj.id,
    }));
    setTaskOptions(taskOptions);
  };

  return (
    <ProModal
      title={`New Time Entry for ${getRequiredDateFormat(selectedKey, 'dddd, DD MMM')}`}
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setVisibility(false)}
      width={580}
      footer={false}
    >
      <ProIntlProvider>
        <ProForm
          onFinish={(values) => {
            let newValues;
            if ('duration' in values) {
              newValues = { date: selectedKey, ...values };
            } else {
              newValues = {
                date: selectedKey,
                start_time: new Date().toISOString(),
                ...values,
              };
            }
            // const newValues = { selectedDate: selectedKey, ...values };

            handleFinish(newValues);
            return Promise.resolve();
          }}
          onReset={() => {
            form.resetFields();
            setVisibility(false);
          }}
          submitter={{
            searchConfig: {
              submitText: `Save Entry`,
              // submitText: `${timeEntry ? 'Save Entry' : 'Start Timer'}`,
              resetText: 'Close',
            },
          }}
        >
          <ProFormSelect
            request={async () => {
              const clientList = await getProjectsForTask();
              return clientList.map((obj: any) => ({
                label: obj.name,
                value: obj.id,
              }));
            }}
            fieldProps={{
              onChange: (value) => {
                getTasksForClient(value);
              },
            }}
            name="project"
            label="Project/Client"
            rules={[{ required: true, message: 'Please select a client!' }]}
          />

          <ProFormSelect
            options={taskOptions}
            name="task"
            label="Task"
            rules={[{ required: true, message: 'Please select your task!' }]}
          />

          <ProForm.Group>
            <ProFormTextArea width="md" name="notes" label="Notes" />
            <ProFormTimePicker
              rules={[{ required: true, message: 'Please enter the time!' }]}
              label="Select Time"
              name="duration"
              fieldProps={{
                format: 'HH:mm',
                showNow: false,
                onOk: () => {
                  setTimeEntry(true);
                },
                onChange: onDateChange,
              }}
            />
          </ProForm.Group>
        </ProForm>
      </ProIntlProvider>
    </ProModal>
  );
};

export default NewEntry;
