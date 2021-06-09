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
    dataIndex: 'tasks',
  },

  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
    valueType: (item) => ({
      type: 'progress',
      status: item.status,
    }),
  },
];

const data = [
  { tasks: 'Testing', total_hours: 8, total_capacity: 35 },
  { tasks: 'Unit Testing', total_hours: 2, total_capacity: 35 },
  { tasks: 'Ui design', total_hours: 4, total_capacity: 35 },
];

const TasksTab = () => {
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

export default TasksTab;
