import { ProIntlProvider, ProModal } from '@/common';
import { getRequiredDateFormat, getStartAndEndOfWeek } from '@/utils/MomentHelpers';
import React, { FC, useCallback, useState } from 'react';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { Modal, Skeleton, Select } from 'antd';
import { getProjectsForTask, getTasks, addWeekRows } from '../../service';
import { useEffect } from 'react';

interface NewEntryProps {
  selectedKey: string;
  visible: boolean;
  setVisibility: any;
  onSuccess: any;
  employee: any;
}

const { Option, OptGroup } = Select;

const NewEntry: FC<NewEntryProps> = ({
  selectedKey,
  visible,
  setVisibility,
  onSuccess,
  employee,
}) => {
  const [form] = ProForm.useForm();
  const [taskOptions, setTaskOptions] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getClientList = async () => {
    setLoading(true);
    await getProjectsForTask()
      .then((clients) => {
        setClientList(clients);
      })
      .catch((err) => {
        setClientList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getClientList();
  }, []);

  const onTaskCreated = () => {
    if (onSuccess) {
      onSuccess();
    }
    setVisibility(false);
  };

  const handleFinish = useCallback(async (values) => {
    const newVal = { org_member_id: employee ? employee?.value : null };
    await addWeekRows({
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
      width={540}
      footer={false}
    >
      <ProIntlProvider>
        <Skeleton active loading={loading}>
          <ProForm
            onFinish={(values) => {
              const dates = getStartAndEndOfWeek(selectedKey);
              const newValues = {
                start_date: dates.start_date,
                end_date: dates.end_date,
                ...values,
              };

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
            {/* <ProFormSelect
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
            /> */}
            <ProForm.Item
              name="project"
              label="Project/Client"
              rules={[{ required: true, message: 'Please select a client!' }]}
              style={{ width: '100%' }}
            >
              <Select
                placeholder="Please select a project"
                onChange={(value: any) => {
                  getTasksForClient(value);
                }}
              >
                {clientList?.map((data: any) => (
                  <OptGroup label={data?.name} key={data.id}>
                    {data?.projects?.map((project: any) => (
                      <Option key={project.id} value={project.id}>
                        {project.name}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </ProForm.Item>

            <ProFormSelect options={taskOptions} name="task_id" label="Task" />

            <ProFormTextArea name="notes" label="Notes" />
          </ProForm>
        </Skeleton>
      </ProIntlProvider>
    </ProModal>
  );
};

export default NewEntry;
