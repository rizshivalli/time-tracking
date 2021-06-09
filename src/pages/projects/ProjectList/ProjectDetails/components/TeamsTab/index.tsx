import { ProIntlProvider } from '@/common';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
  },
  {
    title: 'Work Email',
    dataIndex: 'email',
  },
  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
    valueType: (item) => ({
      type: 'progress',
      status: item.status,
    }),
  },
  {
    title: 'Total Capacity',
    dataIndex: 'total_capacity',
  },
];

const data = [
  { full_name: 'rizwan', total_hours: 8, total_capacity: 35 },
  { full_name: 'ahmed', total_hours: 2, total_capacity: 35 },
  { full_name: 'jane', total_hours: 4, total_capacity: 35 },
];

const TeamsTab = () => {
  const actionRef = useRef<ActionType>();
  return (
    <Row>
      <Col span={24}>
        <ProIntlProvider>
          <ProTable
            //   request={async (params = {}) => {
            //     const data = await getTeamMembers();

            //     return {
            //       data,
            //     };
            //   }}
            dataSource={data}
            columns={columns}
            actionRef={actionRef}
            rowKey="id"
            search={false}
            pagination={{
              pageSize: 25,
            }}
            dateFormatter="string"
            toolBarRender={false}
          />
        </ProIntlProvider>
      </Col>
    </Row>
  );
};

export default TeamsTab;
