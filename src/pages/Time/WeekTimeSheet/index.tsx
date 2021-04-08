import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle } from '@/common';
import { getWeekFromSuntoSat, getToday, getRequiredDateFormat } from '@/utils/MomentHelpers';
import { PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Col, DatePicker, Row, Radio, Select, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewEntryModal } from './components';
import './index.less';

const { Option } = Select;

const today = getToday('dddd, DD MMM');
const todayDate = getToday('MM-DD-YYYY');
const fullDate = getToday('MM-DD-YYYY');
const thisWeekDates = getWeekFromSuntoSat(fullDate);

const getWeekFromSuntoSatForTable = (date: string) => {
  let weekDates = [];
  for (var i = 0; i <= 6; i++) {
    // weekDates.push(getRequiredDateFormat(moment().day(i), 'ddd-DD-MM'));
    weekDates.push({
      title: getRequiredDateFormat(moment(date).day(i), 'DD-MMM'),
      dataIndex: getRequiredDateFormat(moment(date).day(i), 'MM_DD_YYYY'),
      // day: getRequiredDateFormat(moment(date).day(i), 'ddd'),
      // key: getRequiredDateFormat(moment(date).day(i), 'MM-DD-YYYY'),
    });
  }

  const taskName = { title: 'Task Name', dataIndex: 'task_name' };
  const newD = [taskName, ...weekDates];
  return newD;
};

const getWeekdata = getWeekFromSuntoSatForTable(todayDate);
console.log('🚀 ~ file: index.tsx ~ line 35 ~ getWeekdata', getWeekdata);

const data = [
  {
    task_name: 'rizwan',
    '04_04_2021': '8',
    '04_05_2021': '0',
    '04_06_2021': '7',
    '04_07_2021': '3',
    '04_08_2021': '5',
    '04_09_2021': '12',
    '04_10_2021': '0',
  },
  {
    task_name: 'dumy task 2',
    '04_04_2021': 8,
    '04_05_2021': 0,
    '04_06_2021': 7,
    '04_07_2021': 3,
    '04_08_2021': 5,
    '04_09_2021': 12,
    '04_10_2021': 0,
  },
  {
    task_name: 'dummy task 3',
    '04_04_2021': 8,
    '04_05_2021': 0,
    '04_06_2021': 7,
    '04_07_2021': 3,
    '04_08_2021': 5,
    '04_09_2021': 12,
    '04_10_2021': 0,
  },
];
console.log('🚀 ~ file: index.tsx ~ line 71 ~ data', data);

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
            <ProIntlProvider>
              <ProTable
                columns={thisWeekDates}
                // request={() => {
                //   return Promise.resolve({
                //     total: 200,
                //     data: tableListDataSource,
                //     success: true,
                //   });
                // }}
                dataSource={data}
                rowKey="task_name"
                // headerTitle="Style class"
                search={false}
              />
            </ProIntlProvider>
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
