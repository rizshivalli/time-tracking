import { ProGridContainer } from '@/common';
import React, { useState } from 'react';
import { Button } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewClientModal } from './components';

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
      <ProList<{ title: string }>
        toolBarRender={() => {
          return [
            <Button key="3" type="primary" onClick={() => setNewClientModalVisibility(true)}>
              New Client
            </Button>,
          ];
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
      <NewClientModal visible={newClientModal} setVisibility={setNewClientModalVisibility} />
    </ProGridContainer>
  );
};

export default ManageClient;
