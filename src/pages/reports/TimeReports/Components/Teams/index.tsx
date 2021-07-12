import { ProGridContainer, ProIntlProvider, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import './index.less';
import { Link } from 'umi';
import type { FC } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { CSVLink } from 'react-csv';

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
    dataIndex: 'total_hours',
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
                  <Menu.Item key="1">
                    <CSVLink filename={'Teams.csv'} data={data}>
                      CSV
                    </CSVLink>
                  </Menu.Item>
                  <Menu.Item key="2" disabled>
                    <CSVLink filename={'Teams.xls'} data={data}>
                      Excel
                    </CSVLink>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button size="middle" className="Export_btns">
                Export <DownOutlined />
              </Button>
            </Dropdown>
            <Button size="middle" className="Export_btns" disabled>
              Detailed Report
            </Button>
            <Button size="middle" className="Export_btns" disabled>
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
