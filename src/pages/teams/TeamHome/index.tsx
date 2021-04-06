import { ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Row } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ImportPeopleModal } from './components';

const data = [
  { employee_name: 'rizwan', total_hours: 8, total_capacity: 35 },
  { employee_name: 'ahmed', total_hours: 2, total_capacity: 35 },
  { employee_name: 'jane', total_hours: 4, total_capacity: 35 },
];

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Employees',
    dataIndex: 'employee_name',
  },
  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
  },
  {
    title: 'Total Capacity',
    dataIndex: 'total_capacity',
  },
];

const TeamHome = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace>
              <Link to="/people/new">
                <Button icon={<PlusOutlined />}>Add Person</Button>
              </Link>
              <Button>Imports</Button>
              <Button>Export</Button>
            </ProSpace>
            <ProIntlProvider>
              <ProTable
                dataSource={data}
                columns={columns}
                actionRef={actionRef}
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
      <ImportPeopleModal />
    </ProGridContainer>
  );
};

export default TeamHome;
