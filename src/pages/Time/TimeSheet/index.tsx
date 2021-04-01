import { ProGridContainer, ProSpace, ProTitle } from '@/common';
import { getWeekFromSuntoSat, getToday, getRequiredDateFormat } from '@/utils/MomentHelpers';
import { PlusOutlined, ClockCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Row, Tabs, Radio, Select, Tag, Typography, List } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewEntryModal } from './components';
import './index.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const today = getToday('dddd, DD MMM');
const todayDate = getToday('MM-DD-YYYY');
const fullDate = getToday('MM-DD-YYYY');
const thisWeekDates = getWeekFromSuntoSat(fullDate);

const dummyDailyData = [
  {
    billable: true,
    client_name: '[SAMPLE] Client A',
    created_at: '2021-03-29T07:59:55Z',
    hours: 3.45,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '03-30-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-29T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: 'next',
    created_at: '2021-03-30T07:59:55Z',
    hours: 2.45,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '03-31-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-30T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client z',
    created_at: '2021-03-31T07:59:55Z',
    hours: 1.45,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client A',
    created_at: '2021-03-31T07:59:55Z',
    hours: 0,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client z',
    created_at: '2021-03-31T07:59:55Z',
    hours: 1.45,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client A',
    created_at: '2021-03-31T07:59:55Z',
    hours: 0,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client z',
    created_at: '2021-03-31T07:59:55Z',
    hours: 1.45,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client A',
    created_at: '2021-03-31T07:59:55Z',
    hours: 0,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client z',
    created_at: '2021-03-31T07:59:55Z',
    hours: 1.45,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
  {
    billable: true,
    client_name: '[SAMPLE] Client A',
    created_at: '2021-03-31T07:59:55Z',
    hours: 0,
    id: 1461886533,
    invoice_id: 0,
    is_archived: false,
    is_billed: false,
    is_closed: false,
    notes: null,
    project_active: true,
    project_code: 'SAMPLE',
    project_id: 28185502,
    project_name: 'Fixed Fee Project',
    spent_at: '04-01-2021',
    task_active: true,
    task_assignment_active: true,
    task_id: 16324566,
    task_name: 'Design',
    timer_started_at: null,
    updated_at: '2021-03-31T07:59:55Z',
    user_active: true,
    user_assignment_active: true,
    user_id: 3692880,
  },
];

const TimeSheet = () => {
  const [period, setPeriod] = useState<string>('day');
  const [datesToDisplay, setDatesToDisplay] = useState<any[]>(thisWeekDates);
  const [selectedTabKey, setSelectedTabKey] = useState<string>(todayDate);
  const [newEntryModalVisible, setNewEntryModalVisible] = useState<boolean>(false);

  const onDateChange = (date: any, dateString: string) => {
    console.log(date, dateString);
    if (date) {
      const newDate = getRequiredDateFormat(dateString, 'MM-DD-YYYY');
      const getNewDatesArray = getWeekFromSuntoSat(newDate);
      const selectedTab = getRequiredDateFormat(newDate, 'MM-DD-YYYY');
      setDatesToDisplay(() => {
        setSelectedTabKey(() => {
          return selectedTab;
        });
        return getNewDatesArray;
      });
    } else {
      setDatesToDisplay(() => {
        setSelectedTabKey(() => {
          return todayDate;
        });
        return thisWeekDates;
      });
    }
  };

  const toggleDayWeek = (e: any) => {
    setPeriod(e.target.value);
  };

  function callback(key: string) {
    setSelectedTabKey(() => {
      return key;
    });
  }

  const OperationsSlot = {
    left: (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        onClick={() => {
          setNewEntryModalVisible(true);
        }}
      >
        New Entry
      </Button>
    ),
    right: <Tag icon={<ClockCircleOutlined />}>Total: 8:46</Tag>,
  };

  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <div className="card-container">
            <div className="top-widget">
              <ProSpace size="large" align="start" className="top-widget-container">
                <ProSpace>
                  <ProTitle size={3}>Today:</ProTitle>
                  <ProTitle size={3}>{today}</ProTitle>
                </ProSpace>
              </ProSpace>
              <ProSpace size="large" align="end" className="top-widget-container">
                <ProSpace size="middle">
                  <DatePicker onChange={onDateChange} />
                </ProSpace>
                <ProSpace>
                  <Radio.Group
                    value={period}
                    onChange={toggleDayWeek}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="day">Day</Radio.Button>
                    <Link to="/time/time-sheet/week" rel="noopener noreferrer">
                      <Radio.Button value="week">Week</Radio.Button>
                    </Link>
                  </Radio.Group>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Employee"
                    optionFilterProp="children"
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </ProSpace>
              </ProSpace>
            </div>
            <Tabs
              type="card"
              defaultActiveKey={selectedTabKey}
              activeKey={selectedTabKey}
              size="large"
              tabBarExtraContent={OperationsSlot}
              animated={true}
              onChange={callback}
            >
              {datesToDisplay &&
                datesToDisplay.map((item) => {
                  const { date, day, key } = item;
                  return (
                    <TabPane tab={`${day} ${date}`} key={key}>
                      <List
                        footer={
                          <div className="time-list-footer">
                            <Button>Submit Week for Proposal</Button>
                          </div>
                        }
                        size="small"
                        dataSource={dummyDailyData}
                        renderItem={(item) => (
                          <Row>
                            <Col span={24}>
                              {item.spent_at === key ? (
                                <Row justify="center" className="time-card-content">
                                  <Col span={18}>
                                    <ProSpace direction="vertical">
                                      <Text className="time-client-name">{item.client_name}</Text>
                                      <Text className="time-project-name">{item.project_name}</Text>
                                    </ProSpace>
                                  </Col>
                                  <Col span={6} className="card-left-content">
                                    <Text className="time-hours">{item.hours}</Text>
                                    <div>
                                      {item.hours === 0 ? (
                                        <Button
                                          size="large"
                                          type="primary"
                                          icon={<HistoryOutlined spin />}
                                        >
                                          Stop
                                        </Button>
                                      ) : (
                                        <Button size="large" icon={<ClockCircleOutlined />}>
                                          Start
                                        </Button>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              ) : null}
                            </Col>
                          </Row>
                        )}
                      />
                      {/* TODO Total Time of the day */}
                    </TabPane>
                  );
                })}
            </Tabs>
          </div>
        </Col>
      </Row>
      <NewEntryModal
        selectedKey={selectedTabKey}
        visible={newEntryModalVisible}
        setVisibility={setNewEntryModalVisible}
      />
    </ProGridContainer>
  );
};

export default TimeSheet;
