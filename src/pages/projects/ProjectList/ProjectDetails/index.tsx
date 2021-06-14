import { ProDivider, ProGridContainer } from '@/common';
import { Col, Row, Modal, Input, Button, Menu, Dropdown, Progress, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { LeftOutlined, SearchOutlined, EditOutlined, DownOutlined } from '@ant-design/icons';
import { getProjectsById } from '../../service';
import './index.less';
import { LineChart } from '@/common/Charts';
import { TeamsTab, TasksTab } from './components';

const ProjectDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { TabPane } = Tabs;

  const getProjectData = async () => {
    setLoading(true);
    await getProjectsById(id)
      .then((projects) => {
        setData(projects);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx ~ line 30 ~ getProjectData ~ err', err);
        Modal.error({ title: 'Error', content: err });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col span={8}>
          <div className="back_to_Project">
            <LeftOutlined /> Back to Projects
          </div>
        </Col>
        <Col span={6}></Col>
        <Col span={10} className="text-right">
          <Input
            type="Search"
            size="middle"
            prefix={<SearchOutlined />}
            placeholder="Search by client or project name"
          />
        </Col>
      </Row>
      <ProDivider></ProDivider>
      <Row>
        <Col span={18}>
          <p>
            <strong>[SAMPLE] CLIENT A</strong>
          </p>
          <p className="Head_Title">
            [SAMPLE] Fixed Fee Project <small>Fixed Fee</small>
          </p>
          <p className="para_text">
            Fixed fee projects bill at a set price, no matter how many hours are worked. For
            instance, you and your client may agree that building a website will cost $5,000
            regardless of how much time it takes for you and your team to complete it.
          </p>
        </Col>
        <Col span={6}>
          <Button size="middle" className="Projects_btns">
            <EditOutlined /> Edit Projects
          </Button>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">pin</Menu.Item>
                <Menu.Item key="2">Duplicate</Menu.Item>
                <Menu.Item key="3">Archive</Menu.Item>
                <Menu.Item key="4">Delete</Menu.Item>
              </Menu>
            }
          >
            <Button size="middle" className="Projects_btns">
              Action <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <LineChart />
        </Col>
        <Col span={6} className="Projects_Cards">
          <div className="Bar_Chart_Card">
            <div className="Box_Content">Total Hours</div>
            <div className="Main-Text">135.87</div>
            <div className="inline_box">
              <div className="Box_Content">Billable Hours</div>
              <div className="Box-price">124.92</div>
            </div>
            <div className="inline_box">
              <div className="Box_Content">Non-Billable Hours</div>
              <div className="Box-price">10.95</div>
            </div>
          </div>
        </Col>
        <Col span={6} className="Projects_Cards">
          {' '}
          <div className="Bar_Chart_Card">
            <div className="Box_Content">Budget Remaining (9%)</div>
            <div className="Main-Text">$1,854.50</div>
            <div className="inline_box">
              <Progress percent={90} showInfo={false} />
            </div>
            <div className="inline_box">
              <div className="Box_Content">Budget</div>
              <div className="Box-price">$20,170.00</div>
            </div>
          </div>
        </Col>
        <Col span={6} className="Projects_Cards">
          {' '}
          <div className="Bar_Chart_Card">
            <div className="Box_Content">Internal Costs</div>
            <div className="Main-Text">$6,828.80</div>
            <div className="inline_box">
              <div className="Box_Content">Time</div>
              <div className="Box-price">$6,670.80</div>
            </div>
            <div className="inline_box">
              <div className="Box_Content">Expenses</div>
              <div className="Box-price">
                <a href="">$158.00</a>
              </div>
            </div>
          </div>{' '}
        </Col>
        <Col span={6} className="Projects_Cards">
          {' '}
          <div className="Bar_Chart_Card">
            <div className="Box_Content">Uninvoiced Amount</div>
            <div className="Main-Text">$20,170.00</div>
            <div className="inline_box">
              <div className="Box_Content">Total Project Fees</div>
              <div className="Box-price">$20,170.00</div>
            </div>
            <div className="inline_box">
              <div className="Box_Content">
                <a href="">New Invoice</a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ProDivider></ProDivider>
      <Row>
        <Col span={24}>
          <div className="Projects_Tabs">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Tasks" key="1">
                <TeamsTab />
              </TabPane>
              <TabPane tab="Team" key="2">
                <TasksTab />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default ProjectDetails;
