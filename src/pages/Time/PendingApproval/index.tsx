import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Button, Col, Row, Menu, Dropdown, Input } from 'antd';
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { getPendingApprovals } from '../service';
import { Link } from 'react-router-dom';
import './index.less';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    hideInTable: true,
  },
  {
    title: 'Employee Name',
    dataIndex: 'user_name',
    // render: (text, value) => <Link to={`/time/time-sheet/approve/${value.id}`}>{text}</Link>,
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
    title: '',
    key: 'option',
    width: 120,
    valueType: 'option',
    // @ts-ignore
    render: (_, row, index, action) => [
      <Link to={`/time/time-sheet/approve/${row.id}`}>
        <Button key="a" onClick={() => {}}>
          View TimeSheet
        </Button>
      </Link>,
    ],
  },
];
const PendingApproval = () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProTitle size={3}>Pending Approval</ProTitle>
            <Col span={24} className="pending_sorted_Btns">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">Weeks</Menu.Item>
                    <Menu.Item key="2">Projects</Menu.Item>
                    <Menu.Item key="2">People</Menu.Item>
                  </Menu>
                }
              >
                <Button className="sorted_projects">
                  Sorted By: Projects <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Input size="middle" placeholder="Search" prefix={<SearchOutlined />} />
                    </Menu.Item>
                    <Menu.Item key="1">Everyone</Menu.Item>
                    <Menu.Item key="2">My Pinnted Teammates</Menu.Item>
                    <Menu.Item key="3">My Pinned Projects</Menu.Item>
                    <Menu.Item key="4">Sample Role</Menu.Item>
                  </Menu>
                }
              >
                <Button className="Everyone_Btns">
                  Show: Everyone <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <ProIntlProvider>
              <ProTable
                search={false}
                locale={{
                  emptyText: <RandomQuote />,
                }}
                request={async () => {
                  const data = await getPendingApprovals();
                  return { data };
                }}
                columns={columns}
                actionRef={actionRef}
                editable={{
                  type: 'multiple',
                }}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                }}
                dateFormatter="string"
                toolBarRender={false}
              />
            </ProIntlProvider>
            <Button type="primary">Approve Timesheets</Button>
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default PendingApproval;
