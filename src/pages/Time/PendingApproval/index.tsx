import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Button, Col, Row } from 'antd';
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
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
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default PendingApproval;
