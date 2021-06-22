import { ProGridContainer, ProIntlProvider, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import './index.less';
import { Link } from 'umi';
import type { FC } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Task',
    dataIndex: 'project',
    render: (text, row) => <Link to={`/reports/time/team/details/${row.id}`}>{row.name}</Link>,
  },
  {
    title: 'Total Hours',
    dataIndex: 'total_time',
  },
];

interface TeamsReportsProps {
  data: any[];
}

const TeamsReports: FC<TeamsReportsProps> = ({ data }) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <div className="Upper_Class_wraps">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">Excel</Menu.Item>
                  <Menu.Item key="2">CSV</Menu.Item>
                </Menu>
              }
            >
              <Button size="middle" className="Export_btns">
                Export <DownOutlined />
              </Button>
            </Dropdown>
            <Button size="middle" className="Export_btns">
              Detailed Report
            </Button>
            <Button size="middle" className="Export_btns">
              <FormOutlined />
            </Button>
          </div>
        </Col>
      </Row>
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
              pagination={{
                pageSize: 25,
              }}
              dateFormatter="string"
              toolBarRender={false}
            />
          </ProIntlProvider>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TeamsReports;
