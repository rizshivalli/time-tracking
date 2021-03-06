import { ProIntlProvider, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';

import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { FC } from 'react';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Team Members',
    dataIndex: 'name',
  },

  {
    title: 'Total Hours',
    dataIndex: 'total_time',
  },
];

interface TaskTabsProps {
  data: any[];
}

const TasksTab: FC<TaskTabsProps> = ({ data }) => {
  const actionRef = useRef<ActionType>();
  return (
    <Row>
      <Col span={24}>
        <ProIntlProvider>
          <ProTable
            locale={{
              emptyText: <RandomQuote />,
            }}
            dataSource={data}
            columns={columns}
            actionRef={actionRef}
            rowKey="id"
            search={false}
            pagination={false}
            dateFormatter="string"
            toolBarRender={false}
          />
        </ProIntlProvider>
      </Col>
    </Row>
  );
};

export default TasksTab;
