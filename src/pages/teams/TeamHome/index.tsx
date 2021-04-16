import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Row, Statistic } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ImportPeopleModal } from './components';
import './index.less';

const { Divider } = ProCard;

const data = [
  { employee_name: 'rizwan', total_hours: 84, total_capacity: 35 },
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
            <ProDivider />
            <ProSpace size="large">
              <Statistic title="Total Hours" value={80.0} precision={2} />
              <ProDivider type="vertical" />
              <Statistic title="Team Capacity" value={210.0} precision={2} />
              <ProDivider type="vertical" />
            </ProSpace>
            <ProDivider />
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
