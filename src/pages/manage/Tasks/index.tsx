import { ProDivider, ProGridContainer, ProSpace } from '@/common';
import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewTaskModal } from './components';
import { PlusOutlined } from '@ant-design/icons';

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
  const [newTaskModalVisble, setNewTaskModalVisibility] = useState<boolean>(false);
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
              headerTitle="Common Tasks"
              rowSelection={false}
              dataSource={dataSource}
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
      <NewTaskModal visible={newTaskModalVisble} setVisibility={setNewTaskModalVisibility} />
    </ProGridContainer>
  );
};

export default ManageTasks;
