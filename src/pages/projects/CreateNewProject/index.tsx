import { ProDivider, ProGridContainer, ProTitle } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button } from 'antd';
import React, { useState } from 'react';

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

// eslint-disable-next-line no-plusplus
for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Task Name : ${value}`,
    value,
  });
}

const CreateNewProject = () => {
  const [value, setValue] = useState<any[]>([]);
  console.log('value', value);
  const [isClientNew, setClientNew] = useState<boolean>(false);
  const [form] = ProForm.useForm();
  return (
    <ProGridContainer>
      <ProTitle size={2}>New Project</ProTitle>
      <ProDivider />
      <ProForm
        onReset={() => {
          form.resetFields();
        }}
        submitter={{
          searchConfig: {
            submitText: 'Create Project',
            resetText: 'Reset Feilds',
          },
        }}
      >
        <ProForm.Group>
          {isClientNew ? (
            <ProFormText
              width="xl"
              name="new_client_name"
              label="Client Name"
              placeholder="Enter Client Name"
            />
          ) : (
            <ProFormSelect
              width="xl"
              label="Select client for this project"
              options={options}
              placeholder="Please select a client"
              rules={[{ required: true, message: 'Please select a client!' }]}
            />
          )}
          {'or'}{' '}
          {!isClientNew ? (
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setClientNew(true);
              }}
            >
              New Client
            </Button>
          ) : (
            <Button
              onClick={() => {
                setClientNew(false);
              }}
            >
              Choose a client
            </Button>
          )}
        </ProForm.Group>
        <ProFormText
          width="xl"
          name="project_name"
          label="Project Name"
          placeholder="Enter Project Name"
        />
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="project_code"
            label="Project Code"
            placeholder="Enter Project Code"
            tooltip="Optional. The Project Code helps identify your project. You can use any combo of numbers or letters."
          />
          <span>Example Sample Code: SAMPLE </span>
        </ProForm.Group>
        <ProFormDateRangePicker
          name="project_dates"
          label="Dates"
          tooltip="Optional, but recommended. Project dates show up on the project graph. Youʼll still be able to track time outside of this date range."
        />
        <ProFormTextArea
          width="xl"
          name="project_notes"
          label="Notes"
          placeholder="Enter Project Notes"
          tooltip="Use notes to record info that you need to reference later, like invoice schedules. You'll see notes when you invoice for fixed fee projects. Administrators can control access to notes in Settings."
        />{' '}
        <ProDivider />
        <ProFormRadio.Group
          layout="vertical"
          name="radio-group"
          label="Permissions"
          options={[
            {
              label: 'Show project report to project managers on this project, and administrators',
              value: 'a',
            },
            {
              label: 'Show project report to everyone on the project',
              value: 'b',
            },
          ]}
        />
        <ProDivider />
        <ProDivider orientation="left">Tasks</ProDivider>
        <ProFormSelect
          width="xl"
          mode="multiple"
          label="Select tasks for this project"
          options={options}
          // @ts-ignore
          onChange={(newValue: string[]) => {
            setValue(newValue);
          }}
          placeholder="Please select a tasks"
          rules={[{ required: true, message: 'Please select your tasks!' }]}
        />
        <ProDivider orientation="left">Team</ProDivider>
        <ProFormSelect
          width="xl"
          mode="multiple"
          label="Select team for this project"
          options={options}
          // @ts-ignore
          onChange={(newValue: string[]) => {
            setValue(newValue);
          }}
          placeholder="Please select a team"
          rules={[{ required: true, message: 'Please select your team!' }]}
        />
      </ProForm>
    </ProGridContainer>
  );
};

export default CreateNewProject;
