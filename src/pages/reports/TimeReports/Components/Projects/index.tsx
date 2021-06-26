import { ProGridContainer, ProIntlProvider, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row, Button, Dropdown, Menu, Checkbox } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import type { FC } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { CSVLink } from 'react-csv';
import { hasAccess } from '@/utils/token';

const access = hasAccess();

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    render: (text, row) => {
      return (
        <div>
          {access ? (
            <Link to={`/reports/time/project/details/${row.id}`}>{row.project}</Link>
          ) : (
            <div>{text}</div>
          )}
        </div>
      );
    },
  },
  {
    title: 'Client',
    dataIndex: 'client',
    render: (text, row) => {
      return (
        <div>
          {access ? (
            <Link to={`/reports/time/client/details/${row.client_id}`}>{row.client}</Link>
          ) : (
            <div>{text}</div>
          )}
        </div>
      );
    },
  },
  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
  },
];

interface ProjectsReportsProps {
  data: any[];
}

const ProjectsReports: FC<ProjectsReportsProps> = ({ data }) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <div className="Upper_Class_wraps">
            <span className="ss">
              <Checkbox> Active Projects Only </Checkbox>
            </span>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <CSVLink filename={'Projects.csv'} data={data}>
                      CSV
                    </CSVLink>
                  </Menu.Item>
                  <Menu.Item key="2" disabled>
                    <CSVLink filename={'Projects.xls'} data={data}>
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

export default ProjectsReports;
