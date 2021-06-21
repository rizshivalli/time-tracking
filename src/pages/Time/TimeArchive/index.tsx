import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Button, Col, Input, Menu, Row, Dropdown } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { getArchivedApprovals } from '../service';
import './index.less';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Approved By',
    dataIndex: 'user_name',
    render: (text, value) => <div>{value?.approved_by?.full_name}</div>,
  },
  {
    title: 'Date Range',
    dataIndex: 'date_range',
  },
  {
    title: 'Submitted by',
    dataIndex: 'user_name',
    render: (text, value) => <div>{value?.submitted_by?.full_name}</div>,
  },
  {
    title: 'Operation',
    key: 'option',
    width: 120,
    valueType: 'option',
    // @ts-ignore
    render: (_, row, index, action) => [
      <Button key="a" onClick={() => {}}>
        View TimeSheet
      </Button>,
    ],
  },
];

const TimeArchive = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProTitle size={3}>Archive</ProTitle>
            <Col span={6} className="file">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Input size="middle" placeholder="Search" prefix={<SearchOutlined />} />
                    </Menu.Item>
                    <Menu.Item key="1">[SAMPLE] Hiromi Hourglass</Menu.Item>
                    <Menu.Item key="2">[SAMPLE] Kiran Kronological</Menu.Item>
                    <Menu.Item key="3">[SAMPLE] Tamara Timekeeper</Menu.Item>
                    <Menu.Item key="4">Sample Role</Menu.Item>
                    <Menu.Item key="5">Minhaj Ahamed</Menu.Item>
                    <Menu.Item key="6">Minhaj Ahamed</Menu.Item>
                  </Menu>
                }
              >
                <Button className="Show_everyone_btn">
                  Show: Everyone <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <ProIntlProvider>
              <ProTable
                locale={{
                  emptyText: <RandomQuote />,
                }}
                request={async () => {
                  const data = await getArchivedApprovals();
                  return { data };
                }}
                columns={columns}
                actionRef={actionRef}
                editable={{
                  type: 'multiple',
                }}
                rowKey="id"
                search={false}
                pagination={false}
                dateFormatter="string"
                toolBarRender={false}
              />
            </ProIntlProvider>
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TimeArchive;
