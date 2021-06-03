import { ProDivider, ProGridContainer, ProTitle } from '@/common';
import { capacityOptions } from '@/utils/generalUtils';
import ProForm, { ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Modal } from 'antd';
import React, { useCallback } from 'react';
import { createTeamMember } from '../service';
import './index.less';

const AddNewMember = () => {
  const [form] = ProForm.useForm();

  const onTaskCreated = () => {
    form.resetFields();
  };
  const handleFinish = useCallback(async (values) => {
    await createTeamMember(values)
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Team Member Added Successfully.',
            onOk: onTaskCreated,
          });
        }
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);

  return (
    <ProGridContainer>
      <ProTitle size={2}>New Person</ProTitle>
      <ProTitle size={4}>
        We will email this person an invitation to your TimeTracking account.
      </ProTitle>
      <ProDivider />
      <ProForm
        onReset={() => {
          form.resetFields();
        }}
        onFinish={(values) => {
          let contractor;
          if (values.member_type === 'contractor') {
            contractor = { contract: true };
          } else {
            contractor = { contract: false };
          }
          delete values.member_type;

          const finalValues = { ...values, ...contractor };
          handleFinish(finalValues);
          return Promise.resolve();
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
          name="member_type"
          label="Type"
          options={[
            {
              label: 'Employee',
              value: 'employee',
            },
            {
              label: 'Contractor',
              value: 'contractor',
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
          name="designation"
          label="Designation"
          placeholder="Roles are just descriptors for your teammates"
        />
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            label="Capacity"
            name="capacity"
            fieldProps={{ defaultValue: '35' }}
            options={capacityOptions}
            placeholder="Please select a tasks"
            rules={[{ required: true, message: 'Please select your tasks!' }]}
          />
          <span>The number of hours per week this person is available to work.</span>
        </ProForm.Group>
        <ProFormRadio.Group
          layout="vertical"
          name="permission"
          label="Permissions"
          options={[
            {
              label:
                'Regular User (This person can only track time and expenses, and report on their own data.)',
              value: 'team_member',
            },
            {
              label:
                'Project Manager (This person can track time and expenses, report on their own data, and edit, report on, and approve time for projects they manage)',
              value: 'project_manager',
            },
            {
              label: 'Administrator (This person can see and do everything)',
              value: 'admin',
            },
          ]}
        />
      </ProForm>
    </ProGridContainer>
  );
};

export default AddNewMember;
