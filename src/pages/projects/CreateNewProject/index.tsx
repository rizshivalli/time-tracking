import { ProDivider, ProGridContainer, ProTitle } from '@/common';
import ProForm, {
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import React, { useState } from 'react';

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Task Name : ${value}`,
    value,
  });
}

const CreateNewProject = () => {
  const [value, setValue] = useState<Array<any>>([]);

  return (
    <ProGridContainer>
      <ProTitle size={2}>New Project</ProTitle>
      <ProDivider />
      <ProForm>
        <ProFormText
          width="xl"
          name="client_name"
          label="Client Name"
          placeholder="Enter Client Name"
        />
        <ProFormText
          width="xl"
          name="project_name"
          label="Project Name"
          placeholder="Enter Project Name"
        />
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="project_name"
            label="Project Name"
            placeholder="Enter Project Name"
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
      </ProForm>
      <ProDivider />
      <ProDivider orientation="left">Tasks</ProDivider>
      <ProFormSelect
        width="lg"
        mode="multiple"
        // label="Select tasks for this project"
        options={options}
        onChange={(newValue: string[]) => {
          setValue(newValue);
        }}
        placeholder="Please select a tasks"
        rules={[{ required: true, message: 'Please select your tasks!' }]}
      />
    </ProGridContainer>
  );
};

export default CreateNewProject;
