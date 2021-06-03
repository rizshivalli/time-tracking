import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Row, Statistic } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getTeamMembers } from '../service';
import { ImportPeopleModal } from './components';
import './index.less';

const { Divider } = ProCard;

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

const TeamHome = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <div className="add_new">
          <ProSpace>
            <Link to="/people/new">
              <Button icon={<PlusOutlined />} className="add_new_btn">
                Add Person
              </Button>
            </Link>
            <Button>Imports</Button>
            <Button>Export</Button>
          </ProSpace>
        </div>
      </Row>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
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
                request={async (params = {}) => {
                  const data = await getTeamMembers();

                  return {
                    data,
                  };
                }}
                // dataSource={data}
                columns={columns}
                actionRef={actionRef}
                rowKey="id"
                search={{
                  labelWidth: 'auto',
                }}
                pagination={{
                  pageSize: 25,
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
