import { ProDivider, ProGridContainer, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { NewRoleModal } from './components';

const dataSource = [
  {
    title: 'Sample Role',
    description: ' Sample Role 1 description',
  },
  {
    title: 'Sample Role 2',
    description: ' Sample Role 2 description',
  },
  {
    title: 'Sample Role 3',
    description: ' Sample Role 3 description',
  },
  {
    title: 'Sample Role 4',
    description: ' Sample Role 4 description',
  },
];
const ManageRoles = () => {
  const [newRoleModal, setNewRoleModalVisible] = useState<boolean>(false);
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setNewRoleModalVisible(true);
                }}
                icon={<PlusOutlined />}
              >
                New Role
              </Button>
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
                    return [<a key="edit">Edit </a>, <a key="delete">Delete </a>];
                  },
                },
              }}
              rowKey="title"
              headerTitle="Roles"
              rowSelection={false}
              dataSource={dataSource}
            />
          </ProSpace>
        </Col>
      </Row>
      <NewRoleModal visible={newRoleModal} setVisibility={setNewRoleModalVisible} />
    </ProGridContainer>
  );
};

export default ManageRoles;
