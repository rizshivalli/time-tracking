import { ProDivider, ProGridContainer } from '@/common';
import React from 'react';
import { Col, Row, Dropdown, Menu, Button, Progress, Checkbox, Tooltip, Tabs } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.less';
import { ProjectsReports, TeamsReports, TasksReports, ClientsReports } from './Components';

const { TabPane } = Tabs;
const TimeReports = () => {
  return (
    <ProGridContainer>
      <Row>
        <Col span="24" className="AllTime">
          <p className="Main_title">All Time</p>
          <div className="Dropdown">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">Week</Menu.Item>
                  <Menu.Item key="2">Semimonth</Menu.Item>
                  <Menu.Item key="3">Month</Menu.Item>
                  <Menu.Item key="4">Quarter</Menu.Item>
                  <Menu.Item key="5">Year</Menu.Item>
                  <Menu.Item key="6">All Time</Menu.Item>
                  <Menu.Item key="7">Custom</Menu.Item>
                </Menu>
              }
            >
              <Button className="All_TIme_btns">
                All Time <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Col>
        <ProDivider></ProDivider>
        <Col span={4}>
          <div className="paragraphs">
            <p className="head_title">Hours Tracked</p>
            <p className="amount_title">570.81</p>
          </div>
        </Col>
        <Col span={3} className="progress_bar">
          <Progress type="circle" percent={67} width={80} />
        </Col>
        <Col span={6} className="Circle_Wraps">
          <div className="left_text">
            <p className="head_title">Billable Hours</p>
          </div>
          <div className="left_text">
            <p className="green_box"></p>
            <p>
              <strong> 382.30 </strong> Billable
            </p>
          </div>
          <div className="left_text">
            <p className="skyblue_box"></p>
            <p>
              <strong> 188.51</strong> Non-Billable
            </p>
          </div>
        </Col>
        <Col span={6}>
          <p className="head_title">Billable Amount</p>
          <p className="amount_title">$38,563.00</p>
          <div className="project_fee">
            <Checkbox> Include fixed fee projects</Checkbox>
            <Tooltip title="Billable Amounts for fixed fee projects are based on hourly rates. This means the Billable Amount may not match the invoiced amount.">
              <p>?</p>
            </Tooltip>
          </div>
        </Col>
        <Col span={5}>
          <p className="head_title">Uninvoiced Amount</p>
          <p className="amount_title">$38,617.00</p>
          <p>Excludes fixed fee projects</p>
        </Col>
      </Row>
      <ProDivider></ProDivider>
      <Row>
        <Col span={24}>
          <div className="Task_Projects_Tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Clients" key="1">
                <ClientsReports />
              </TabPane>
              <TabPane tab="Projects" key="2">
                <ProjectsReports />
              </TabPane>
              <TabPane tab="Task" key="3">
                <TasksReports />
              </TabPane>
              <TabPane tab="Team" key="4">
                <TeamsReports />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TimeReports;
