import { ProDivider, ProGridContainer } from '@/common';
import React from 'react';
import { Col, Row, Dropdown, Menu, Button, Progress, Checkbox, Tooltip, Tabs } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { ProjectsReports, TasksReports } from '../Components';
import './index.less';

const { TabPane } = Tabs;
const TeamTime = () => {
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
          <p>[SAMPLE] Hiromi Hourglass</p>
        </Col>
      </Row>
      <Row className="Report_rowmap">
        <Col span={4} className="Report_Head_Content">
          <div className="paragraphs">
            <div className="head_title">Hours Tracked</div>
            <div className="amount_title">148.10</div>
          </div>
        </Col>
        <Col span={4}>
          <div className="progress_bar">
            <Progress type="circle" percent={76} width={80} />
          </div>
        </Col>
        <Col span={6} className="Report_Head_Content">
          <div className="left_text">
            <div className="head_title">Billable Hours</div>
          </div>
          <div className="left_text">
            <p className="green_box"></p>
            <p>
              <strong> 112.67 </strong> Billable
            </p>
          </div>
          <div className="left_text">
            <p className="skyblue_box"></p>
            <p>
              <strong> 35.43</strong> Non-Billable
            </p>
          </div>
        </Col>
        <Col span={5} className="Report_Head_Content">
          <div className="head_title">Billable Amount</div>
          <div className="amount_title">$8,357.00</div>
          <div className="project_fee">
            <Checkbox> Include fixed fee projects</Checkbox>
            <Tooltip title="Billable Amounts for fixed fee projects are based on hourly rates. This means the Billable Amount may not match the invoiced amount.">
              <p>?</p>
            </Tooltip>
          </div>
        </Col>
        <Col span={5} className="Report_Head_Content">
          <div className="head_title">Uninvoiced Amount</div>
          <div className="amount_title">$8,357.00</div>
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
              <TabPane tab="Task" key="2">
                <TasksReports />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TeamTime;
