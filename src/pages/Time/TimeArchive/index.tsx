import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Button, Col, Row } from 'antd';
import React, { useRef } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { Link } from 'react-router-dom';
import type { ActionType } from '@ant-design/pro-table';
import { getArchivedApprovals } from '../service';

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
            <ProIntlProvider>
              <ProTable
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

export default TimeArchive;
