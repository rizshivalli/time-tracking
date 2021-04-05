import { ProDivider, ProGridContainer, ProSpace } from '@/common';
import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewClientModal } from './components';
import { PlusOutlined } from '@ant-design/icons';

const dataSource = [
  {
    title: 'Client 1',
    description: ' Client 1 description',
  },
  {
    title: 'Client 2',
    description: ' Client 2 description',
  },
  {
    title: 'Client 3',
    description: ' Client 3 description',
  },
  {
    title: 'Client 4',
    description: ' Client 4 description',
  },
];

const ManageClient = () => {
  const [newClientModal, setNewClientModalVisibility] = useState<boolean>(false);
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace>
              <Button
                type="primary"
                size="large"
                onClick={() => setNewClientModalVisibility(true)}
                icon={<PlusOutlined />}
              >
                New Client
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
                    return [<a key="edit">Edit Client Details</a>];
                  },
                },
              }}
              rowKey="title"
              headerTitle="Manage Clients"
              rowSelection={false}
              dataSource={dataSource}
            />
          </ProSpace>
        </Col>
      </Row>

      <NewClientModal visible={newClientModal} setVisibility={setNewClientModalVisibility} />
    </ProGridContainer>
  );
};

export default ManageClient;
