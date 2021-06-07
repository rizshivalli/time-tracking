import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, message, Row } from 'antd';
import ProList from '@ant-design/pro-list';
import { NewClientModal } from './components';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { getClients } from './service';
import { Link } from 'react-router-dom';
import './index.less';

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
        setClientList([]);
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
                size="medium"
                onClick={() => setNewClientModalVisibility(true)}
                icon={<PlusOutlined />}
              >
                New Client
              </Button>
              <Button className="btncom" size="medium" icon={<PlusOutlined />}>
                Add Contact
              </Button>
              <Button className="btncom" size="medium">
                Import/Export {<DownOutlined />}
              </Button>
            </ProSpace>
            <ProDivider />
            <ProIntlProvider>
              <ProList<{ title: string; id: string }>
                loading={clientLoading}
                toolBarRender={() => {
                  return [];
                }}
                metas={{
                  title: {
                    dataIndex: 'name',
                  },
                  id: { dataIndex: 'id' },
                  description: {},
                  actions: {
                    render: (text, row) => {
                      return [
                        <Link to={`/manage/clients/${row.id}`} key="edit">
                          Edit Client Details{' '}
                        </Link>,
                      ];
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
