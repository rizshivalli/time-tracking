import { ProDivider, ProGridContainer, ProSpace } from '@/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewTaskModal } from './components';
import { PlusOutlined } from '@ant-design/icons';
import { getCommonTasks, deleteCommonTask } from './service';
import DeleteAlert from '@/common/DeleteAlert';

const dataSource = [
  {
    title: 'Task 1',
    description: ' Task 1 description',
  },
  {
    title: 'Task 2',
    description: ' Task 2 description',
  },
  {
    title: 'Task 3',
    description: ' Task 3 description',
  },
  {
    title: 'Task 4',
    description: ' Task 4 description',
  },
];

const ManageTasks = () => {
  const [commonLoading, setCommonLoading] = useState<boolean>(false);
  const [newTaskModalVisble, setNewTaskModalVisibility] = useState<boolean>(false);
  const [commonTasks, setCommonTasks] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState<any>({ visible: false, id: null });
  const hideDeleteModal = useCallback(() => setDeleteAlert({ visible: false, id: null }), [
    deleteAlert,
  ]);

  useEffect(() => {
    getCommonTasksFromServer();
  }, []);
  const getCommonTasksFromServer = useCallback(async () => {
    setCommonLoading(true);

    await getCommonTasks()
      .then((result) => {
        console.log('🚀 ~ file: index.tsx ~ line 36 ~ .then ~ result', result);
        setCommonTasks(result);
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setCommonLoading(false);
      });
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace>
              <Button
                type="primary"
                size="large"
                onClick={() => setNewTaskModalVisibility(true)}
                icon={<PlusOutlined />}
              >
                New Task
              </Button>{' '}
            </ProSpace>
            <ProDivider />
            <ProList<{ id: string; name: string }>
              loading={commonLoading}
              toolBarRender={() => {
                return [];
              }}
              metas={{
                title: {
                  dataIndex: 'name',
                },

                actions: {
                  render: (text, row) => {
                    console.log('🚀 ~ file: index.tsx ~ line 80 ~ ManageTasks ~ row', row);
                    return [
                      <a key="archive">Archive</a>,
                      <Button
                        key="delete"
                        type="link"
                        onClick={() => setDeleteAlert({ visible: true, id: row.id })}
                      >
                        Delete
                      </Button>,
                    ];
                  },
                },
              }}
              rowKey="id"
              headerTitle="Common Tasks"
              rowSelection={false}
              dataSource={commonTasks}
            />
            <ProDivider />
            <ProList<{ title: string }>
              toolBarRender={() => {
                return [];
              }}
              metas={{
                title: {},
                description: {},

                actions: {
                  render: () => {
                    return [<a key="archive">Archive</a>, <a key="delete">Delete</a>];
                  },
                },
              }}
              rowKey="title"
              headerTitle="Other Tasks"
              rowSelection={false}
              dataSource={dataSource}
            />
          </ProSpace>
        </Col>
      </Row>
      <NewTaskModal
        visible={newTaskModalVisble}
        setVisibility={setNewTaskModalVisibility}
        onSuccess={getCommonTasksFromServer}
      />
      <DeleteAlert
        visible={deleteAlert.visible}
        hideModal={hideDeleteModal}
        info={deleteAlert.id}
        deleteAPI={deleteCommonTask}
        onSuccess={getCommonTasksFromServer}
      />
    </ProGridContainer>
  );
};

export default ManageTasks;
