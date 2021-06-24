import { history } from 'umi';
import { ProDivider, ProGridContainer, ProIntlProvider, ProTitle } from '@/common';
import { getClients } from '@/pages/manage/Client/service';
import { getCommonTasks } from '@/pages/manage/Tasks/service';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button } from 'antd';
import { Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import { createProject, getTeamMates } from '../service';
import SendInviteModal from './components/SendInviteModal';
import './index.less';

const CreateNewProject = () => {
  const [isClientNew, setClientNew] = useState<boolean>(false);
  const [inviteFormVisible, setInviteFormVisiblity] = useState<boolean>(false);
  const [form] = ProForm.useForm();

  const onTaskCreated = () => {
    form.resetFields();
    history.goBack();
  };

  const handleFinish = useCallback(async (values) => {
    // setPending(true);

    await createProject(values)
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Project Created Successfully.',
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
      <ProTitle size={2}>New Project</ProTitle>
      <ProDivider />
      <ProIntlProvider>
        <ProForm
          form={form}
          onReset={() => {
            form.resetFields();
            history.goBack();
          }}
          submitter={{
            searchConfig: {
              submitText: 'Create Project',
              resetText: 'Cancel',
            },
          }}
          onFinish={(values: any) => {
            console.log('🚀 ~ file: index.tsx ~ line 58 ~ CreateNewProject ~ values', values);

            if (values.project_dates && values.project_dates !== 0) {
              const pastDate = {
                start_date: values?.project_dates[0],
                end_date: values?.project_dates[1],
              };
              const newValues = { ...values, ...pastDate };

              delete newValues?.project_dates;
              console.log(
                '🚀 ~ file: index.tsx ~ line 91 ~ CreateNewProject ~ newValues',
                newValues,
              );
              handleFinish(newValues);
              // return newDateRange;
            } else {
              handleFinish(values);
            }

            return Promise.resolve();
          }}
        >
          <ProForm.Group>
            {isClientNew ? (
              <ProFormText
                width="xl"
                name="client_new"
                label="Client Name"
                placeholder="Enter New Client Name"
                rules={[{ required: true, message: 'Please Enter new client name' }]}
              />
            ) : (
              <ProFormSelect
                width="xl"
                name="client"
                label="Select client for this project"
                request={async () => {
                  const clientList = await getClients();
                  return clientList.map((obj: any) => ({
                    label: obj.name,
                    value: obj.id,
                  }));
                }}
                placeholder="Please select a client"
                rules={[{ required: true, message: 'Please select a client!' }]}
              />
            )}
            {'or'}
            {!isClientNew ? (
              <Button
                className="New_Clinets_wraps"
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
            name="name"
            label="Project Name"
            placeholder="Enter Project Name"
            rules={[{ required: true, message: 'Please Enter Project Name' }]}
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
            name="notes"
            label="Notes"
            placeholder="Enter Project Notes"
            tooltip="Use notes to record info that you need to reference later, like invoice schedules. You'll see notes when you invoice for fixed fee projects. Administrators can control access to notes in Settings."
          />{' '}
          <ProDivider />
          <ProFormRadio.Group
            layout="vertical"
            name="radio-group"
            label="Permissions"
            rules={[{ required: true, message: 'Please select any one of the permissions!' }]}
            options={[
              {
                label:
                  'Show project report to project managers on this project, and administrators',
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
            name="tasks"
            request={async () => {
              const clientList = await getCommonTasks();
              return clientList.map((obj: any) => ({
                label: obj.name,
                value: obj.id,
              }));
            }}
            placeholder="Please select a tasks"
            rules={[{ required: true, message: 'Please select your tasks!' }]}
          />
          <ProDivider orientation="left">Team</ProDivider>
          <ProForm.Group>
            <ProFormSelect
              width="xl"
              name="team_members"
              mode="multiple"
              label="Select team for this project"
              request={async () => {
                const teammates = await getTeamMates();
                return teammates?.map((obj: any) => ({
                  label: `${obj.full_name} [${obj.permission}]`,
                  value: obj.id,
                }));
              }}
              placeholder="Please select a team"
              rules={[{ required: true, message: 'Please select your team!' }]}
            />
            <div>
              Or,{' '}
              <a
                onClick={() => {
                  setInviteFormVisiblity(true);
                }}
              >
                invite more people
              </a>{' '}
              to your Timetracking account.
            </div>
          </ProForm.Group>
        </ProForm>
      </ProIntlProvider>
      <SendInviteModal visible={inviteFormVisible} setVisibility={setInviteFormVisiblity} />
    </ProGridContainer>
  );
};

export default CreateNewProject;
