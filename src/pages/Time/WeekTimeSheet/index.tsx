import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import { getToday, getRequiredDateFormat, getStartAndEndOfWeek } from '@/utils/MomentHelpers';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Col, DatePicker, Row, Radio, Select } from 'antd';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'umi';
import { getWeekTimeRecords, updateWeekRecords, submitWeekForApproval } from '../service';
import { NewEntryModal } from './components';
import './index.less';

const { Option } = Select;

const today = getToday('dddd, DD MMM');

// const thisWeekDates = getWeekFromSuntoSat(fullDate);

const getWeekFromSuntoSatForTable = (date: string) => {
  let weekDates = [];
  for (let i = 0; i <= 6; i++) {
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
      render: (text, value) => <div>{`[${value?.project_name}] ${text}`}</div>,
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
      editable: false,
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

  const operation = [
    {
      title: 'Total Hours',
      dataIndex: 'duration',
      // hideInForm: true,
      // @ts-ignore
      editable: false,
    },
    {
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
          Edit
        </a>,
        // <a key="a" onClick={() => {}}>
        //   Delete
        // </a>,
      ],
    },
  ];

  const newD = [...taskName, ...weekDates, ...operation];
  return newD;
};

const TimeSheet = () => {
  const todayDate = getToday('MM-DD-YYYY');
  const getWeekdata = getWeekFromSuntoSatForTable(todayDate);
  console.log('🚀 ~ file: index.tsx ~ line 107 ~ TimeSheet ~ getWeekdata', getWeekdata);
  const [period, setPeriod] = useState<string>('week');
  const [datesToDisplay, setDatesToDisplay] = useState<any[]>(getWeekdata);
  const [selectedTabKey, setSelectedTabKey] = useState<string>(todayDate);
  const [newEntryModalVisible, setNewEntryModalVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [approvalStatus, setApprovalStatus] = useState<string>();
  const [date, setDate] = useState<string>(todayDate);
  const actionRef = useRef<ActionType>();

  const submitWeek = async () => {
    const dates = getStartAndEndOfWeek(selectedTabKey);
    await submitWeekForApproval(dates);
  };

  const onDateChange = (date: any, dateString: string) => {
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
                locale={{
                  emptyText: <RandomQuote />,
                }}
                actionRef={actionRef}
                columns={datesToDisplay && datesToDisplay}
                request={async () => {
                  const data = await getAllWeekData(date);
                  const { approval_status, time_records } = data;
                  setApprovalStatus(approval_status);
                  return { data: time_records, success: true };
                }}
                pagination={false}
                editable={{
                  type: 'multiple',
                  editableKeys,
                  deletePopconfirmMessage: 'Delete This week entry?',
                  onSave: async (key, row) => {
                    const data = await updateWeekRecords(row);
                    if (data === 200) {
                      actionRef?.current?.reload();
                    }
                  },
                  onChange: setEditableRowKeys,
                }}
                rowKey="id"
                search={false}
                footer={() => [
                  <div>
                    <Button
                      size="large"
                      key="3"
                      type="primary"
                      className="Weektime_Btns"
                      onClick={() => {
                        setNewEntryModalVisible(true);
                      }}
                    >
                      <PlusOutlined />
                      New Entry
                    </Button>

                    <Button
                      size="large"
                      key="2"
                      type="primary"
                      className="Weektime_Btns"
                      onClick={() => {
                        submitWeek();
                      }}
                    >
                      <CheckOutlined />
                      Submit Week For Approval
                    </Button>
                  </div>,
                ]}
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
