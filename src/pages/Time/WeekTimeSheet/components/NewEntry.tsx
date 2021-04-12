import { ProIntlProvider, ProModal } from '@/common';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';
import React, { FC, useCallback, useState } from 'react';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { Modal } from 'antd';
import { getProjectsForTask, getTasks, createNewTimeRecord, addWeekRows } from '../../service';
import moment from 'moment';

interface NewEntryProps {
  selectedKey: string;
  visible: boolean;
  setVisibility: any;
  onSuccess: any;
}
const NewEntry: FC<NewEntryProps> = ({ selectedKey, visible, setVisibility, onSuccess }) => {
  const [form] = ProForm.useForm();
  const [timeEntry, setTimeEntry] = useState<boolean>(false);
  const [client, setClient] = useState('');
  const [taskOptions, setTaskOptions] = useState([]);
  const onDateChange = (date: any, dateString: string) => {
    console.log(date, dateString);
    if (date) {
      setTimeEntry(true);
    } else {
      setTimeEntry(false);
    }
  };

  const onTaskCreated = () => {
    if (onSuccess) {
      onSuccess();
    }
    setVisibility(false);
  };

  const getStartAndEndOfWeek = (date: string) => {
    const dates = {
      start_date: getRequiredDateFormat(moment(date).startOf('week'), 'MM-DD-YYYY'),
      end_date: getRequiredDateFormat(moment(date).endOf('week'), 'MM-DD-YYYY'),
    };
    return dates;
  };

  const handleFinish = useCallback(async (values) => {
    console.log('🚀 ~ file: NewTask.tsx ~ line 25 ~ handleFinish ~ values', values);
    // setPending(true);

    await addWeekRows(values)
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
      width={540}
      footer={false}
    >
      <ProIntlProvider>
        <ProForm
          onFinish={(values) => {
            const dates = getStartAndEndOfWeek(selectedKey);
            const newValues = { start_date: dates.start_date, end_date: dates.end_date, ...values };

            console.log('🚀 ~ file: NewEntry.tsx ~ line 91 ~ values', newValues);
            handleFinish(newValues);
            return Promise.resolve();
          }}
          onReset={() => {
            form.resetFields();
            setVisibility(false);
          }}
          submitter={{
            searchConfig: {
              submitText: 'Save Entry',
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
            name="project_id"
            label="Project/Client"
          />

          <ProFormSelect options={taskOptions} name="task_id" label="Task" />

          <ProFormTextArea name="notes" label="Notes" />
        </ProForm>
      </ProIntlProvider>
    </ProModal>
  );
};

export default NewEntry;
