import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, message, Row, Dropdown, Menu } from 'antd';
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
          <div className="manage_title">Manage Clients</div>
        </Col>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace>
              <div className="buttons_wraps">
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => setNewClientModalVisibility(true)}
                  icon={<PlusOutlined />}
                >
                  New Client
                </Button>
                <Button className="btncom" size="middle" icon={<PlusOutlined />} disabled>
                  Add Contact
                </Button>
                <Dropdown
                  disabled
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Import Client From CSV</Menu.Item>
                      <Menu.Item key="2">Import Contacts From CSV</Menu.Item>
                      <div className="divider"></div>
                      <Menu.Item key="3">Export Client to Excel</Menu.Item>
                      <Menu.Item key="4">Export Client to CSV</Menu.Item>
                      <Menu.Item key="5">Export Contacts to Excel</Menu.Item>
                      <Menu.Item key="6">Export Contacts to CSV</Menu.Item>
                    </Menu>
                  }
                >
                  <Button className="btncom">
                    Import/Export <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
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
