import { ProDivider, ProGridContainer, ProSpace } from '@/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, message, Row, Menu, Dropdown } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewTaskModal } from './components';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { getCommonTasks, deleteCommonTask } from './service';
import DeleteAlert from '@/common/DeleteAlert';
import './index.less';

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
  const hideDeleteModal = useCallback(
    () => setDeleteAlert({ visible: false, id: null }),
    [deleteAlert],
  );

  const getCommonTasksFromServer = useCallback(async () => {
    setCommonLoading(true);

    await getCommonTasks()
      .then((result) => {
        setCommonTasks(result);
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setCommonLoading(false);
      });
  }, []);

  useEffect(() => {
    getCommonTasksFromServer();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace>
              <Button
                type="primary"
                size="middle"
                onClick={() => setNewTaskModalVisibility(true)}
                icon={<PlusOutlined />}
              >
                New Task
              </Button>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">Export to Excel</Menu.Item>
                    <Menu.Item key="2">Export to CSV</Menu.Item>
                  </Menu>
                }
              >
                <Button className="Export_Wraps_btn">
                  Export <DownOutlined />
                </Button>
              </Dropdown>
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
            {/* <ProList<{ title: string }>
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
            /> */}
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
