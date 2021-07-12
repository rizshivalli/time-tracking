import { ProIntlProvider, ProModal } from '@/common';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';
import React, { FC, useCallback, useState, useEffect } from 'react';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormTimePicker } from '@ant-design/pro-form';
import { Modal, Select } from 'antd';
import { getTimeRecordByID, editTimeRecord } from '../../service';
import { Skeleton } from 'antd';
import moment from 'moment';

interface EditTimeProps {
  selectedKey: string;
  visible: boolean;
  setVisibility: any;
  onSuccess: any;
  employee: any;
  timeID: string | number;
}

const EditTimeEntry: FC<EditTimeProps> = ({
  selectedKey,
  visible,
  setVisibility,
  onSuccess,
  employee,
  timeID,
}) => {
  const [form] = ProForm.useForm();
  const [timeEntry, setTimeEntry] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [existingTime, setExistingTime] = useState<any>({});

  const getClientList = async () => {
    setLoading(true);
    await getTimeRecordByID(timeID)
      .then(async (time) => {
        setExistingTime(time);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getClientList();
  }, []);

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
    delete values?.project;
    delete values?.task;
    delete values?.date;
    await editTimeRecord(timeID, {
      ...values,
      ...newVal,
    })
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Time Edited Successfully.',
            onOk: onTaskCreated,
          });
        }
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);

  return (
    <ProModal
      title={`Edit Time Entry for ${
        !loading ? existingTime?.task?.name : ''
      } ${getRequiredDateFormat(selectedKey, 'dddd, DD MMM')}`}
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setVisibility(false)}
      width={580}
      footer={false}
    >
      <ProIntlProvider>
        <Skeleton active loading={loading}>
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

              handleFinish(newValues);
              return Promise.resolve();
            }}
            onReset={() => {
              form.resetFields();
              setVisibility(false);
            }}
            submitter={{
              searchConfig: {
                submitText: `Edit Entry`,
                // submitText: `${timeEntry ? 'Save Entry' : 'Start Timer'}`,
                resetText: 'Close',
              },
            }}
          >
            <ProForm.Item
              name="project"
              initialValue={existingTime?.project?.name}
              label="Project/Client"
              rules={[{ required: true, message: 'Please select a client!' }]}
              style={{ width: '100%' }}
            >
              <Select disabled placeholder="Please select a project" />
            </ProForm.Item>

            <ProFormSelect
              name="task"
              disabled
              initialValue={existingTime?.task?.name}
              label="Task"
              rules={[{ required: true, message: 'Please select your task!' }]}
            />

            <ProForm.Group>
              <ProFormTextArea
                width="md"
                name="notes"
                label="Notes"
                initialValue={existingTime?.notes !== null ? existingTime?.notes : ''}
              />
              <ProFormTimePicker
                initialValue={moment(existingTime?.duration, 'HH:mm:ss')}
                rules={[{ required: true, message: 'Please enter the time!' }]}
                label="Select Time"
                name="duration"
                fieldProps={{
                  //   defaultValue: ,
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
        </Skeleton>
      </ProIntlProvider>
    </ProModal>
  );
};

export default EditTimeEntry;
