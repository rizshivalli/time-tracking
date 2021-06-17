import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace, RandomQuote } from '@/common';
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  DownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Row, Statistic, Progress, Menu, Dropdown, Input, Skeleton } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import { getTeamMembers } from '../service';
import { ImportPeopleModal } from './components';
import './index.less';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
  },
  {
    title: 'Work Email',
    dataIndex: 'email',
  },
  {
    title: 'Total Hours',
    dataIndex: 'total_hours',
    valueType: (item) => ({
      type: 'progress',
      status: item.status,
    }),
  },
  {
    title: 'Total Capacity',
    dataIndex: 'total_capacity',
  },
];

const TeamHome = () => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [importModalVisible, setImportModalVisibility] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    await getTeamMembers()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProGridContainer>
      <Skeleton loading={loading} active avatar>
        <Row>
          <Col span={24}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <ProSpace>
                <Link to="/people/new">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Person
                  </Button>
                </Link>
<<<<<<< Updated upstream
                <Button className="Team_BtnsWrpas">Imports</Button>
                <Button className="Team_BtnsWrpas">Export</Button>
=======
                <Button
                  onClick={() => {
                    setImportModalVisibility(true);
                  }}
                >
                  Imports
                </Button>
                <Button>Export</Button>
>>>>>>> Stashed changes
              </ProSpace>
            </ProSpace>
          </Col>
          <ProDivider />
          <Col span={24} className="left">
            <Button icon={<LeftOutlined />}></Button>
            <Button icon={<RightOutlined />}></Button>
            <p>
              <strong>This Week :</strong> 07 – 13 Jun 2021
            </p>
            <div>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Input placeholder="Search" prefix={<SearchOutlined />} />
                    </Menu.Item>
                    <Menu.Item key="1">Everyone</Menu.Item>
                    <Menu.Item key="2">My Pins</Menu.Item>
                    <Menu.Item key="3">Sample Roles</Menu.Item>
                  </Menu>
                }
              >
                <Button className="btn">
                  Everyone <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <ProDivider />
        <Row className="list_row">
          <Col span={4} className="List_Cards_Wraps">
            <ProSpace size="large">
              <Statistic title="Total Hours" value={80.0} precision={2} />
              <ProDivider type="vertical" />
            </ProSpace>
          </Col>
          <Col span={4} className="List_Cards_Wraps">
            <ProSpace size="large">
              <Statistic title="Team Capacity" value={210.0} precision={2} />
              <ProDivider type="vertical" />
            </ProSpace>
          </Col>
          <Col span={7} className="List_Cards_Wraps">
            <div className="left_text">
              <p className="green_box"></p>
              <p>
                Billable <strong> 0:00</strong>
              </p>
            </div>
            <div className="left_text">
              <p className="skyblue_box"></p>
              <p>
                Non-Billable <strong>0:00</strong>
              </p>
            </div>
          </Col>
          <Col span={9} className="List_Cards_Wraps">
            <Progress percent={60} success={{ percent: 30 }} />
          </Col>
        </Row>
        <ProDivider />
        <Row>
          <Col span={24}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
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
            </ProSpace>
          </Col>
        </Row>
        <ImportPeopleModal visible={importModalVisible} setVisibility={setImportModalVisibility} />
      </Skeleton>
    </ProGridContainer>
  );
};

export default TeamHome;
