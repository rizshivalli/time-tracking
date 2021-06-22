import { ProDivider } from '@/common';
import {
  CheckCircleOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Col, Row, Checkbox } from 'antd';
import React from 'react';
import './index.less';

const Home = () => {
  return (
    <Row>
      <Col span={24}>
        <p className="Home_Welcome_Wraps">Welcome to Simplifi Team!</p>
      </Col>
      <ProDivider></ProDivider>
      <Col span={18}>
        <div>
          <p>Here’s how to get started:</p>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <CheckCircleOutlined />
          </span>
          <p className="Home_fonts_wraps">Learn the basics of time tracking</p>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <PlusCircleOutlined />
          </span>
          <p className="Home_fonts_wraps">Track your first hour</p>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <ClockCircleOutlined />
          </span>
          <p className="Home_fonts_wraps">Peruse your projects</p>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <PlayCircleOutlined />
          </span>
          <p className="Home_fonts_wraps">Get the desktop and mobile apps</p>
        </div>
      </Col>
      <Col span={6}></Col>
      <Col span={18}>
        <div className="belowlinks_wraps">
          <p className="para_links">
            <a href="">Webinars</a>
          </p>
          <p>
            Live online classes. Pick the<br></br> brains of our experts.
          </p>
        </div>
        <div className="belowlinks_wraps">
          <p className="para_links">
            <a href="">Help Center</a>
          </p>
          <p>
            Our knowledge base<br></br> and FAQs.
          </p>
        </div>
        <div className="belowlinks_wraps">
          <p className="para_links">
            <a href="">Support</a>
          </p>
          <p>
            Friendly experts, always <br></br>ready to help.
          </p>
        </div>
      </Col>
      <ProDivider></ProDivider>
      <Col span={24}>
        <Checkbox>
          <span> Email me occasional updates, tips, and interesting stories</span>
        </Checkbox>
      </Col>
    </Row>
  );
};

export default Home;
