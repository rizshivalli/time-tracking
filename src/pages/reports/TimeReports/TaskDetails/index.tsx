import { ProDivider, ProGridContainer } from '@/common';
import React from 'react';
import { Col, Row, Dropdown, Menu, Button, Progress, Checkbox, Tooltip, Tabs } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { ProjectsReports, TeamsReports } from '../Components';
import './index.less';

const { TabPane } = Tabs;
const TaskTime = () => {
  return (
    <ProGridContainer>
      <Row>
        <Col span={24} className="AllTime">
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
      </Row>
      <ProDivider></ProDivider>
      <Row className="Projects_TimeDetails_Row">
        <Col span={24} className="Projects_Names_Wraps">
          <span>
            <a href="">
              Time Report <RightOutlined />
            </a>
          </span>
          <p>Marketing</p>
        </Col>
      </Row>
      <Row className="Report_rowmap">
        <Col span={4} className="Report_Head_Content">
          <div className="paragraphs">
            <p className="head_title">Hours Tracked</p>
            <p className="amount_title">237.06</p>
          </div>
        </Col>
        <Col span={4}>
          <div className="progress_bar">
            <Progress type="circle" percent={83} width={80} />
          </div>
        </Col>
        <Col span={6} className="Report_Head_Content">
          <div className="left_text">
            <p className="head_title">Billable Hours</p>
          </div>
          <div className="left_text">
            <p className="green_box"></p>
            <p>
              <strong> 197.89 </strong> Billable
            </p>
          </div>
          <div className="left_text">
            <p className="skyblue_box"></p>
            <p>
              <strong> 39.17</strong> Non-Billable
            </p>
          </div>
        </Col>
        <Col span={5} className="Report_Head_Content">
          <p className="head_title">Billable Amount</p>
          <p className="amount_title">$19,283,.25.</p>
          <div className="project_fee">
            <Checkbox> Include fixed fee projects</Checkbox>
            <Tooltip title="Billable Amounts for fixed fee projects are based on hourly rates. This means the Billable Amount may not match the invoiced amount.">
              <p>?</p>
            </Tooltip>
          </div>
        </Col>
        <Col span={5} className="Report_Head_Content">
          <p className="head_title">Uninvoiced Amount</p>
          <p className="amount_title">$19,183.25</p>
          <p className="excludes">Excludes fixed fee projects</p>
        </Col>
      </Row>
      <ProDivider></ProDivider>
      <Row>
        <Col span={24}>
          <div className="Task_Projects_Tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Projects" key="1">
                <ProjectsReports />
              </TabPane>
              <TabPane tab="Team" key="2">
                <TeamsReports />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TaskTime;
