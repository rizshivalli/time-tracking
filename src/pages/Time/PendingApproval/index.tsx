import { ProGridContainer, ProSpace, ProTitle } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';

const data = [
  { id: 1, employee_name: 'rizwan' },
  { id: 2, employee_name: 'rizwan 1' },
  { id: 3, employee_name: 'rizwan 2' },
  { id: 4, employee_name: 'rizwan 3' },
  { id: 5, employee_name: 'rizwan 4' },
];
const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Employee Name',
    dataIndex: 'employee_name',
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
            <ProTable
              dataSource={data}
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
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default PendingApproval;
