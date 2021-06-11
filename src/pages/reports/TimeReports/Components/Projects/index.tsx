import { ProGridContainer, ProIntlProvider } from '@/common';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Col, Row, Button, Dropdown, Menu, Checkbox } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import './index.less';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Name',
    dataIndex: 'tasks',
  },

  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
    valueType: (item) => ({
      type: 'progress',
      status: item.status,
    }),
  },
];

const data = [
  { tasks: 'Testing', total_hours: 8, total_capacity: 35 },
  { tasks: 'Unit Testing', total_hours: 2, total_capacity: 35 },
  { tasks: 'Ui design', total_hours: 4, total_capacity: 35 },
];

const ProjectsReports = () => {
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
              //   request={async (params = {}) => {
              //     const data = await getTeamMembers();

              //     return {
              //       data,
              //     };
              //   }}
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
