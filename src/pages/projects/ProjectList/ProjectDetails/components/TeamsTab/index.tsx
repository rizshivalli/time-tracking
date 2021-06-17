import { ProIntlProvider } from '@/common';
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
    title: 'Task Name',
    dataIndex: 'name',
  },
  {
    title: 'Total hours',
    dataIndex: 'total_time',
  },
];

interface TeamsTabsProps {
  data: any[];
}

const TeamsTab: FC<TeamsTabsProps> = ({ data }) => {
  const actionRef = useRef<ActionType>();
  return (
    <Row>
      <Col span={24}>
        <ProIntlProvider>
          <ProTable
            options={false}
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
