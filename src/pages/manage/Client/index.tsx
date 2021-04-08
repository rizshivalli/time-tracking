import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewClientModal } from './components';
import { PlusOutlined } from '@ant-design/icons';
import { getClients } from './service';

const ManageClient = () => {
  const [newClientModal, setNewClientModalVisibility] = useState<boolean>(false);
  const [clientLoading, setClientLoading] = useState<boolean>(false);
  const [clientList, setClientList] = useState([]);

  const getClientsFromServer = useCallback(async () => {
    setClientLoading(true);

    await getClients()
      .then((result) => {
        setClientList(result);
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setClientLoading(false);
      });
  }, []);

  useEffect(() => {
    getClientsFromServer();
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
                onClick={() => setNewClientModalVisibility(true)}
                icon={<PlusOutlined />}
              >
                New Client
              </Button>
            </ProSpace>
            <ProDivider />
            <ProIntlProvider>
              <ProList<{ title: string }>
                loading={clientLoading}
                toolBarRender={() => {
                  return [];
                }}
                metas={{
                  title: {
                    dataIndex: 'name',
                  },
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
                dataSource={clientList}
              />
            </ProIntlProvider>
          </ProSpace>
        </Col>
      </Row>

      <NewClientModal
        visible={newClientModal}
        setVisibility={setNewClientModalVisibility}
        onSuccess={getClientsFromServer}
      />
    </ProGridContainer>
  );
};

export default ManageClient;
