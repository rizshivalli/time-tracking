import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle } from '@/common';
import { getWeekFromSuntoSat, getToday, getRequiredDateFormat } from '@/utils/MomentHelpers';
import { PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import ProTable, { ActionType, EditableProTable } from '@ant-design/pro-table';
import { Button, Col, DatePicker, Row, Radio, Select, Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
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
      dataIndex: getRequiredDateFormat(moment(date).day(i), 'MM-DD-YYYY'),
      // day: getRequiredDateFormat(moment(date).day(i), 'ddd'),
      key: getRequiredDateFormat(moment(date).day(i), 'MM-DD-YYYY'),
    });
  }

  const taskName = {
    title: 'Task Name',
    dataIndex: 'task_name',
    // @ts-ignore
    editable: (text, record, index) => {
      return index < 0;
    },
  };
  const operation = {
    title: 'Operation',
    key: 'option',
    width: 120,
    valueType: 'option',
    // @ts-ignore
    render: (_, row, index, action) => [
      <a
        key="a"
        onClick={() => {
          action.startEditable(row.id);
        }}
      >
        edit
      </a>,
    ],
  };
  const newD = [taskName, ...weekDates, operation];
  return newD;
};

const data = [
  {
    id: '1',
    task_name: 'rizwan',
    '04-04-2021': '8',
    '04-05-2021': '0',
    '04-06-2021': '7',
    '04-07-2021': '3',
    '04-08-2021': '5',
    '04-09-2021': '12',
    '04-10-2021': '0',
  },
  {
    id: '2',
    task_name: 'dumy task 2',
    '04-04-2021': 8,
    '04-05-2021': 0,
    '04-06-2021': 7,
    '04-07-2021': 3,
    '04-08-2021': 5,
    '04-09-2021': 12,
    '04-10-2021': 0,
  },
  {
    id: '3',
    task_name: 'dummy task 3',
    '04-04-2021': 8,
    '04-05-2021': 0,
    '04-06-2021': 7,
    '04-07-2021': 3,
    '04-08-2021': 5,
    '04-09-2021': 12,
    '04-10-2021': 0,
  },
];

const TimeSheet = () => {
  const getWeekdata = getWeekFromSuntoSatForTable(todayDate);
  const [period, setPeriod] = useState<string>('week');
  const [datesToDisplay, setDatesToDisplay] = useState<Array<any>>(getWeekdata);
  const [selectedTabKey, setSelectedTabKey] = useState<string>(todayDate);
  const [newEntryModalVisible, setNewEntryModalVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [dataSource, setDataSource] = useState(data);
  const actionRef = useRef<ActionType>();

  const onDateChange = (date: any, dateString: string) => {
    console.log(date, dateString);
    if (date) {
      const newDate = getRequiredDateFormat(dateString, 'MM-DD-YYYY');
      const getNewDatesArray = getWeekFromSuntoSatForTable(newDate);
      setDatesToDisplay(() => {
        return getNewDatesArray;
      });
    } else {
      const fullDate = getToday('MM-DD-YYYY');
      const thisWeekDates = getWeekFromSuntoSatForTable(fullDate);
      setDatesToDisplay(() => {
        return thisWeekDates;
      });
    }
  };

  const toggleDayWeek = (e: any) => {
    setPeriod(e.target.value);
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
                actionRef={actionRef}
                columns={datesToDisplay && datesToDisplay}
                // request={() => {
                //   return Promise.resolve({
                //     total: 200,
                //     data: tableListDataSource,
                //     success: true,
                //   });
                // }}
                editable={{
                  type: 'multiple',
                  editableKeys,
                  onSave: async (key, row) => {
                    console.log('🚀 ~ file: index.tsx ~ line 237 ~ onSave: ~ values', row);
                  },
                  onChange: setEditableRowKeys,
                }}
                dataSource={dataSource}
                rowKey="id"
                // headerTitle="Style class"
                search={false}
              />
            </ProIntlProvider>
          </div>
        </Col>
      </Row>
      {/* <NewEntryModal
        selectedKey={selectedTabKey}
        visible={newEntryModalVisible}
        setVisibility={setNewEntryModalVisible}
      /> */}
    </ProGridContainer>
  );
};

export default TimeSheet;
