import { ProDivider } from '@/common';
import {
  CloseOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import './index.less';

const Home = () => {
  return (
    <Row>
      <Col span={12}>
        <p className="Home_Welcome_Wraps">Welcome to Simplifi Team!</p>
      </Col>
      <Col span={12}></Col>
      <ProDivider></ProDivider>
      <Col span={18}>
        <div>
          <p>Here’s how to get started:</p>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <CheckCircleOutlined />
          </span>
          <span className="Home_fonts_wraps">Learn the basics of time tracking</span>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <PlusCircleOutlined />
          </span>
          <span className="Home_fonts_wraps">Track your first hour</span>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <ClockCircleOutlined />
          </span>
          <span className="Home_fonts_wraps">Peruse your projects</span>
        </div>
        <div className="Home_clicking_divs_wraps">
          <span className="Home_icons_Wraps">
            <ExclamationCircleOutlined />
          </span>
          <span className="Home_fonts_wraps">Get the desktop and mobile apps</span>
        </div>
      </Col>
      <Col span={6}></Col>
      <Col span={18}>
        <div className="belowlinks_wraps">
          <p>
            <a href="">Webinars</a>
          </p>
          <p>
            Live online classes. Pick the<br></br> brains of our experts.
          </p>
        </div>
        <div className="belowlinks_wraps">
          <p>
            <a href="">Help Center</a>
          </p>
          <p>Our knowledge base and FAQs.</p>
        </div>
        <div className="belowlinks_wraps">
          <p>
            <a href="">Support</a>
          </p>
          <p>Friendly experts, always ready to help.</p>
        </div>
      </Col>
      <ProDivider></ProDivider>
      <Col span={24}>
        <input type="checkbox"></input>
        <span>Email me occasional updates, tips, and interesting stories</span>
      </Col>
    </Row>
  );
};

export default Home;
