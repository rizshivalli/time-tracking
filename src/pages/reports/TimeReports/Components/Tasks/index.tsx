import { ProGridContainer, ProIntlProvider, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, Row, Button, Dropdown, Menu, Progress, Tooltip } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
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
    render: (text, row) => <Link to={`/reports/time/task/details/${row.id}`}>{row.task}</Link>,
  },
  {
    title: 'Total Hours',
    dataIndex: 'sum',
  },
];

interface TasksReportsProps {
  data: any[];
}

const TasksReports: FC<TasksReportsProps> = ({ data }) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <Col span={12}>
          <span>
            <Tooltip title="3 done / 3 in progress / 4 to do">
              <Progress percent={60} success={{ percent: 30 }} width={30} />
            </Tooltip>
          </span>
        </Col>
        <Col span={12}>
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

export default TasksReports;
