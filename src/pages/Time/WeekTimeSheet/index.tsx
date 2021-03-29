import { ProGridContainer, ProSpace, ProTitle } from '@/common';
import { getWeekFromSuntoSat, getToday, getRequiredDateFormat } from '@/utils/MomentHelpers';
import { PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Row, Tabs, Radio, Select, Tag } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewEntryModal } from './components';
import './index.less';

const { TabPane } = Tabs;
const { Option } = Select;

const today = getToday('dddd, DD MMM');
const todayDate = getToday('MM-DD-YYYY');
const fullDate = getToday('MM-DD-YYYY');
const thisWeekDates = getWeekFromSuntoSat(fullDate);

const TimeSheet = () => {
  const [period, setPeriod] = useState<string>('week');
  const [datesToDisplay, setDatesToDisplay] = useState<Array<any>>(thisWeekDates);
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
      const todayDate = getToday('MM-DD-YYYY');
      const fullDate = getToday('MM-DD-YYYY');
      const thisWeekDates = getWeekFromSuntoSat(fullDate);
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
                    <Link to="/time/time-sheet/day" rel="noopener noreferrer">
                      <Radio.Button value="day">Day</Radio.Button>
                    </Link>

                    <Radio.Button value="week">Week</Radio.Button>
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
                      <p>date is {date}</p>
                      <p>day is {day}</p>
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
