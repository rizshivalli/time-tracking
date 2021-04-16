import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { getPendingApprovals } from '../service';
import { Link } from 'react-router-dom';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Employee Name',
    dataIndex: 'user_name',
    render: (text, value) => <Link to={`/time/time-sheet/approve/${value.id}`}>{text}</Link>,
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
                search={{
                  labelWidth: 'auto',
                }}
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
