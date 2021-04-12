import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle } from '@/common';
import { getToday, getRequiredDateFormat } from '@/utils/MomentHelpers';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Col, DatePicker, Row, Radio, Select } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import { getWeekTimeRecords, updateWeekRecords } from '../service';
import { NewEntryModal } from './components';
import './index.less';

const { Option } = Select;

const today = getToday('dddd, DD MMM');

// const thisWeekDates = getWeekFromSuntoSat(fullDate);

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

  const taskName = [
    {
      title: 'Task Name',
      dataIndex: 'task_name',
      // @ts-ignore
      // editable: (text, record, index) => {
      //   return index < 0;
      // },
      editable: false,
    },

    {
      title: 'project_id',
      dataIndex: 'project_id',
      hideInTable: true,
      // hideInForm: true,
      // @ts-ignore
      editable: (text, record, index) => {
        return index < 0;
      },
    },
    {
      title: 'project_name',
      dataIndex: 'project_name',
      hideInTable: true,
      // hideInForm: true,
      // @ts-ignore
      editable: (text, record, index) => {
        return index < 0;
      },
    },
    {
      title: 'task_id',
      dataIndex: 'task_id',
      hideInTable: true,
      // hideInForm: true,
      // @ts-ignore
      editable: (text, record, index) => {
        return index < 0;
      },
    },
  ];

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
  const newD = [...taskName, ...weekDates, operation];
  return newD;
};

const data = [
  {
    id: '1',
    task_name: 'rizwan',
    project_id: 123,
    '04-11-2021': 8,
    '04-12-2021': 0,
    '04-13-2021': 7,
    '04-14-2021': 3,
    '04-15-2021': 5,
    '04-16-2021': 12,
    '04-17-2021': 0,
  },
  {
    id: '2',
    task_name: 'dumy task 2',
    project_id: 124,
    '04-11-2021': 8,
    '04-12-2021': 0,
    '04-13-2021': 7,
    '04-14-2021': 3,
    '04-15-2021': 5,
    '04-16-2021': 12,
    '04-17-2021': 0,
  },
  {
    id: '3',
    task_name: 'dummy task 3',
    project_id: 125,
    '04-11-2021': 8,
    '04-12-2021': 0,
    '04-13-2021': 7,
    '04-14-2021': 3,
    '04-15-2021': 5,
    '04-16-2021': 12,
    '04-17-2021': 0,
  },
];

const getStartAndEndOfWeek = (date: string) => {
  const dates = {
    start_date: getRequiredDateFormat(moment(date).startOf('week'), 'MM-DD-YYYY'),
    end_date: getRequiredDateFormat(moment(date).endOf('week'), 'MM-DD-YYYY'),
  };
  return dates;
};

const TimeSheet = () => {
  const todayDate = getToday('MM-DD-YYYY');
  const getWeekdata = getWeekFromSuntoSatForTable(todayDate);
  const [period, setPeriod] = useState<string>('week');
  const [datesToDisplay, setDatesToDisplay] = useState<Array<any>>(getWeekdata);
  const [selectedTabKey, setSelectedTabKey] = useState<string>(todayDate);
  const [newEntryModalVisible, setNewEntryModalVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef<ActionType>();
  const [date, setDate] = useState<string>(todayDate);

  const onDateChange = (date: any, dateString: string) => {
    console.log('🚀 ~ file: index.tsx ~ line 149 ~ onDateChange ~ date', date);

    if (date) {
      const newDate = getRequiredDateFormat(dateString, 'MM-DD-YYYY');
      setDate(newDate);
      const getNewDatesArray = getWeekFromSuntoSatForTable(newDate);
      getStartAndEndOfWeek(date);
      setSelectedTabKey(newDate);
      setDatesToDisplay(() => {
        return getNewDatesArray;
      });
      actionRef?.current?.reload();
    } else {
      const fullDate = getToday('MM-DD-YYYY');
      setDate(fullDate);
      const thisWeekDates = getWeekFromSuntoSatForTable(fullDate);
      getStartAndEndOfWeek(fullDate);
      setSelectedTabKey(fullDate);
      setDatesToDisplay(() => {
        return thisWeekDates;
      });
      actionRef?.current?.reload();
    }
  };

  const toggleDayWeek = (e: any) => {
    setPeriod(e.target.value);
  };

  const getAllWeekData = useCallback(async (date: string) => {
    const dates = getStartAndEndOfWeek(date);
    const weekData = await getWeekTimeRecords(dates.start_date, dates.end_date);
    return weekData;
  }, []);

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
                request={async (params = {}) => {
                  const data = await getAllWeekData(date);
                  return { data };
                }}
                editable={{
                  type: 'multiple',
                  editableKeys,
                  onSave: async (key, row) => {
                    const data = await updateWeekRecords(row);
                    if (data === 200) {
                      actionRef?.current?.reload();
                    }
                  },
                  onChange: setEditableRowKeys,
                }}
                // dataSource={data}
                rowKey="id"
                toolBarRender={() => [
                  <Button
                    size="large"
                    key="3"
                    type="primary"
                    onClick={() => {
                      setNewEntryModalVisible(true);
                    }}
                  >
                    <PlusOutlined />
                    New Entry
                  </Button>,
                ]}
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
        onSuccess={actionRef?.current?.reload()}
      />
    </ProGridContainer>
  );
};

export default TimeSheet;
