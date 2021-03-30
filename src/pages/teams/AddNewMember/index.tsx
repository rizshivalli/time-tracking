import { ProDivider, ProGridContainer, ProTitle } from '@/common';
import ProForm, { ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const options = [
  { value: '0.5', label: '0.5' },
  { value: '1.0', label: '1.0' },
  { value: '2.0', label: '2.0' },
  { value: '3.0', label: '3.0' },
];

const AddNewMember = () => {
  const [form] = ProForm.useForm();
  return (
    <ProGridContainer>
      <ProTitle size={2}>New Person</ProTitle>
      <ProTitle size={4}>
        We’ll email this person an invitation to your TimeTracking account.
      </ProTitle>
      <ProDivider />
      <ProForm
        onReset={() => {
          form.resetFields();
        }}
        submitter={{
          searchConfig: {
            submitText: 'Invite and Continue',
            resetText: 'Cancel',
          },
        }}
      >
        <ProFormRadio.Group
          layout="horizontal"
          name="radio-group"
          label="Type"
          options={[
            {
              label: 'Employee',
              value: 'a',
            },
            {
              label: 'Contractor',
              value: 'b',
            },
          ]}
        />
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="first_name"
            label="First Name"
            placeholder="Enter First Name"
          />{' '}
          <ProFormText
            width="sm"
            name="last_name"
            label="Last Name"
            placeholder="Enter Last Name"
          />{' '}
        </ProForm.Group>
        <ProFormText
          width="lg"
          name="email"
          label="Work Email"
          placeholder="Enter Work Email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please enter a valid email address',
            },
          ]}
        />
        <ProDivider />
        <ProFormText
          width="lg"
          name="roles"
          label="Roles"
          placeholder="Roles are just descriptors for your teammates"
        />
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            label="Capacity"
            options={options}
            placeholder="Please select a tasks"
            rules={[{ required: true, message: 'Please select your tasks!' }]}
          />
          <span>The number of hours per week this person is available to work.</span>
        </ProForm.Group>
        <ProFormRadio.Group
          layout="vertical"
          name="radio-group"
          label="Permissions"
          options={[
            {
              label:
                'Regular User (This person can only track time and expenses, and report on their own data.)',
              value: 'a',
            },
            {
              label:
                'Project Manager (This person can track time and expenses, report on their own data, and edit, report on, and approve time for projects they manage)',
              value: 'b',
            },
            {
              label: 'Administrator (This person can see and do everything)',
              value: 'b',
            },
          ]}
        />
      </ProForm>
    </ProGridContainer>
  );
};

export default AddNewMember;
