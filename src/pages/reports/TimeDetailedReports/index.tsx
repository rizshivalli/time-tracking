import { ProGridContainer } from '@/common';
import { Col, Row, Input, Form, Checkbox, Button, Select, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less';

const TaskReports = () => {
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <div className="form_box">
            <Form name="basic" initialValues={{ remember: true }}>
              <Form.Item label="TimeFrame">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1">This Week</Menu.Item>
                      <Menu.Item key="2">Last Week</Menu.Item>
                      <Menu.Item key="3">This Semimonth</Menu.Item>
                      <Menu.Item key="4">Last Semimonth</Menu.Item>
                      <Menu.Item key="5">This Month (june)</Menu.Item>
                      <Menu.Item key="6">Last Month (july)</Menu.Item>
                      <Menu.Item key="7">This Quarter</Menu.Item>
                      <Menu.Item key="8">Last Quarter</Menu.Item>
                      <Menu.Item key="9">This Year</Menu.Item>
                      <Menu.Item key="10">Last Year</Menu.Item>
                      <Menu.Item key="11">All Time</Menu.Item>
                      <Menu.Item key="12">Custom</Menu.Item>
                    </Menu>
                  }
                >
                  <Button size="middle" className="Projects_btns">
                    This Week <DownOutlined />
                  </Button>
                </Dropdown>
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Include archived items in filters</Checkbox>
              </Form.Item>
              <Form.Item label="Clients">
                <Select placeholder="All Clients">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Projects">
                <Select placeholder="All Projects">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Tasks">
                <Select placeholder="All Tasks">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Team">
                <Select placeholder="All Teams">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Run Report
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TaskReports;
