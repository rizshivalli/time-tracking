import { history } from '@/.umi/core/history';
import { ProDivider, ProGridContainer, ProIntlProvider, ProSkeleton, ProTitle } from '@/common';
import { getCommonTasks } from '@/pages/manage/Tasks/service';
import ProForm, {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { getProjectsById, getTeamMates, editProjectsById } from '../../service';

const ProjectDetails = (props: any) => {
  const [form] = ProForm.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [id] = useState<string>(props?.match?.params?.detail);

  const getProjectData = async () => {
    setLoading(true);
    await getProjectsById(id)
      .then((projects) => {
        setData(projects);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx ~ line 30 ~ getProjectData ~ err', err);
        Modal.error({ title: 'Error', content: err });
        // message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProjectData();
  }, []);

  const onTaskCreated = () => {
    getProjectData();
  };

  const handleFinish = useCallback(async (values) => {
    delete values?.client;
    await editProjectsById(id, values)
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Project Modified Successfully.',
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
      <ProTitle size={2}>Edit Project</ProTitle>
      <ProDivider />
      <ProIntlProvider>
        {loading ? (
          <ProSkeleton type="descriptions" />
        ) : (
          <ProForm
            form={form}
            onReset={() => {
              history.goBack();
              form.resetFields();
            }}
            initialValues={{
              client: data?.client?.name,
              name: data?.name,
            }}
            submitter={{
              searchConfig: {
                submitText: 'Edit Project',
                resetText: 'Go Back',
              },
            }}
            onFinish={(values: any) => {
              handleFinish(values);
              return Promise.resolve();
            }}
          >
            <ProFormText
              width="xl"
              name="client"
              label="Client Name"
              initialValue={data?.client?.name}
              disabled
            />
            <ProFormText
              width="xl"
              name="name"
              label="Project Name"
              initialValue={data?.name}
              // placeholder="Enter Project Name"
              rules={[{ required: true, message: 'Please Enter Project Name' }]}
              disabled
            />
            <ProForm.Group>
              <ProFormText
                width="sm"
                name="project_code"
                label="Project Code"
                initialValue={data?.project_code}
                placeholder="Enter Project Code"
                tooltip="Optional. The Project Code helps identify your project. You can use any combo of numbers or letters."
              />
              <span>Example Sample Code: SAMPLE </span>
            </ProForm.Group>
            <ProForm.Group>
              <ProFormDatePicker
                name="start_date"
                label="Start Date"
                initialValue={data?.start_date}
                tooltip="Optional, but recommended. Project dates show up on the project graph. Youʼll still be able to track time outside of this date range."
              />
              <ProFormDatePicker
                name="end_date"
                label="End Date"
                initialValue={data?.end_date}
                tooltip="Optional, but recommended. Project dates show up on the project graph. Youʼll still be able to track time outside of this date range."
              />
            </ProForm.Group>
            <ProFormTextArea
              width="xl"
              name="notes"
              label="Notes"
              placeholder="Enter Project Notes"
              initialValue={data?.notes}
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
              initialValue={data?.tasks?.map((a: any) => a.id)}
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
                initialValue={data?.team_members?.map((a: any) => a.id)}
                request={async () => {
                  const teammates = await getTeamMates();
                  return teammates?.map((obj: any) => ({
                    label: `${obj.id} (${obj.role}) `,
                    value: obj.id,
                  }));
                }}
                placeholder="Please select a team"
                rules={[{ required: true, message: 'Please select your team!' }]}
              />
            </ProForm.Group>
          </ProForm>
        )}
      </ProIntlProvider>
    </ProGridContainer>
  );
};

export default ProjectDetails;
