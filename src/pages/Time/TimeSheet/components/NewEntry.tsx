import { ProModal } from '@/common';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';
import React, { FC, useState } from 'react';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormTimePicker } from '@ant-design/pro-form';

interface NewEntryProps {
  selectedKey: string;
  visible: boolean;
  setVisibility: any;
}
const NewEntry: FC<NewEntryProps> = ({ selectedKey, visible, setVisibility }) => {
  const [form] = ProForm.useForm();
  const [timeEntry, setTimeEntry] = useState<boolean>(false);

  const onDateChange = (date: any, dateString: string) => {
    console.log(date, dateString);
    if (date) {
      setTimeEntry(true);
    } else {
      setTimeEntry(false);
    }
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
      <ProForm
        onReset={() => {
          form.resetFields();
          setVisibility(false);
        }}
        submitter={{
          searchConfig: {
            submitText: `${timeEntry ? 'Save Entry' : 'Start Timer'}`,
            resetText: 'Close',
          },
        }}
      >
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          name="project"
          label="Project/Client"
        />
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          name="task"
          label="Task"
        />
        <ProForm.Group>
          <ProFormTextArea width="md" name="notes" label="Notes" />
          <ProFormTimePicker
            label="Select Time"
            name="time"
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
    </ProModal>
  );
};

export default NewEntry;
