import { ProGridContainer, ProSpace, ProTitle } from '@/common';
import {
  getWeekFromSuntoSat,
  getToday,
  getStartAndEndOfWeek,
  getRequiredDateFormat,
} from '@/utils/MomentHelpers';
import { PlusOutlined, ClockCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Row,
  Tabs,
  Radio,
  Select,
  Tag,
  Typography,
  List,
  message,
  Statistic,
  Empty,
  Timeline,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTimeRecords, stopTimeRecord, submitWeekForApproval } from '../service';

import { NewEntryModal } from './components';
import moment from 'moment';
import './index.less';
import { zeroPad } from '@/utils/generalUtils';

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const today = getToday('dddd, DD MMM');
const todayDate = getToday('YYYY-MM-DD');
const fullDate = getToday('YYYY-MM-DD');
const thisWeekDates = getWeekFromSuntoSat(fullDate);

const calulateTotalWeekTime = (weekArray: any[]) => {
  return weekArray
    ?.map((a: any) => parseFloat(a?.duration?.replace(':', '.')))
    ?.filter((value: any) => !Number.isNaN(value))
    ?.reduce((a: number, b: number) => a + b, 0)
    ?.toFixed(2)
    ?.toString()
    ?.replace('.', ':');
};

const TimeSheet = () => {
  const [period, setPeriod] = useState<string>('day');
  const [datesToDisplay, setDatesToDisplay] = useState<any[]>(thisWeekDates);
  const [selectedTabKey, setSelectedTabKey] = useState<string>(todayDate);
  const [newEntryModalVisible, setNewEntryModalVisible] = useState<boolean>(false);
  const [weekData, setWeekData] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [weekTotal, setWeekTotal] = useState<string>('0');
  const [weekStatus, setWeekStatus] = useState<string>('Not Submitted');

  const checkWeekApprovalStatus = (time: any) => {
    let status = 'unapproved';
    if (time?.length > 0 && time[0]?.approval?.status) {
      status = time[0]?.approval?.status;
    }
    setWeekStatus(status);
  };
  const getWeekData = useCallback(
    async (key: string = selectedTabKey) => {
      console.log('🚀 ~ file: index.tsx ~ line 71 ~ key', key);
      const newDates = getStartAndEndOfWeek(key);
      setListLoading(true);
      await getTimeRecords(newDates)
        .then((time) => {
          const total = calulateTotalWeekTime(time);
          setWeekTotal(total);
          setWeekData(time);
          checkWeekApprovalStatus(time);
        })
        .catch((err) => {
          message.error(err);
        })
        .finally(() => {
          setListLoading(false);
        });
    },
    [selectedTabKey],
  );

  const stopTimer = async (id: string, values: any) => {
    await stopTimeRecord(id, values);
    getWeekData(selectedTabKey);
  };

  useEffect(() => {
    getWeekData(selectedTabKey);
  }, []);

  const onDateChange = (date: any, dateString: string) => {
    console.log(date, dateString);
    if (date) {
      const newDate = getRequiredDateFormat(dateString, 'YYYY-MM-DD');
      const getNewDatesArray = getWeekFromSuntoSat(newDate);
      const selectedTab = getRequiredDateFormat(newDate, 'YYYY-MM-DD');
      setDatesToDisplay(() => {
        setSelectedTabKey(() => {
          return selectedTab;
        });
        return getNewDatesArray;
      });
      getWeekData(newDate);
    } else {
      setDatesToDisplay(() => {
        setSelectedTabKey(() => {
          return todayDate;
        });
        return thisWeekDates;
      });
      getWeekData(todayDate);
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

  const submitWeek = async () => {
    const dates = getStartAndEndOfWeek(selectedTabKey);
    console.log('🚀 ~ file: index.tsx ~ line 172 ~ submitWeek ~ selectedTabKey', selectedTabKey);
    console.log('🚀 ~ file: index.tsx ~ line 135 ~ submitWeek ~ dates', dates);
    await submitWeekForApproval(dates);
    getWeekData(selectedTabKey);
  };

  const getDuration = (startTime: string, endTime: string) => {
    const hourDiff = zeroPad(moment(endTime).diff(startTime, 'hours'));
    const minDiffer = zeroPad(moment(endTime).diff(startTime, 'minutes'));
    const totalDiffer = `${hourDiff}:${minDiffer}`;
    return totalDiffer;
  };
  const OperationsSlot = {
    // left: (
    //   <Button
    //     type="primary"
    //     icon={<PlusOutlined />}
    //     size="large"
    //     onClick={() => {
    //       setNewEntryModalVisible(true);
    //     }}
    //   >
    //     New Entry
    //   </Button>
    // ),
    right: <Tag icon={<ClockCircleOutlined />}>Week Total: {weekTotal && weekTotal}</Tag>,
  };

  return (
    <ProGridContainer>
      <Row>
        <Col span={2}>
          <div className="new_entry_wraps">
            <Button
              size="large"
              className="btn"
              type="primary"
              onClick={() => {
                setNewEntryModalVisible(true);
              }}
              icon={<PlusOutlined />}
            />
            <div className="entry_class_wraps">New Entry</div>
          </div>
        </Col>
        <Col span={21}>
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
                    disabled
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
            {/* Status Text */}
            {!listLoading && weekStatus !== 'Not Submitted' && weekStatus !== 'unapproved' && (
              <div
                className="status-text"
                style={{
                  backgroundColor:
                    weekStatus === 'Submitted for Approval'
                      ? '#fadadd'
                      : '#7998a3' && weekStatus === 'Approved'
                      ? '#a9ffa9'
                      : '#7998a3',
                }}
              >
                {weekStatus}
              </div>
            )}

            <Tabs
              type="card"
              defaultActiveKey={selectedTabKey}
              activeKey={selectedTabKey}
              size="small"
              animated={true}
              onChange={callback}
              tabBarExtraContent={OperationsSlot}
            >
              {datesToDisplay?.length === 0 ? (
                <Empty />
              ) : (
                datesToDisplay.map((item) => {
                  const { date, day, key } = item;
                  return (
                    <TabPane tab={`${day} ${date}`} key={key}>
                      <List
                        // Footer
                        footer={
                          !listLoading && weekData?.length !== 0 ? (
                            <div className="time-list-footer">
                              <Button
                                onClick={() => {
                                  submitWeek();
                                }}
                                disabled={weekStatus !== 'unapproved' ? true : false}
                              >
                                Submit Week for Approval
                              </Button>
                            </div>
                          ) : null
                        }
                        size="small"
                        loading={listLoading}
                        dataSource={weekData}
                        renderItem={(listItem) => {
                          return (
                            <Row>
                              <Col span={24}>
                                {getRequiredDateFormat(listItem?.date, 'YYYY-MM-DD') === key ? (
                                  <Row justify="center" className="time-card-content">
                                    <Col span={18}>
                                      <ProSpace direction="vertical">
                                        <Text className="time-client-name">
                                          {`[${
                                            listItem?.project?.project_code
                                              ? listItem?.project?.project_code
                                              : listItem?.project?.name
                                          }]${listItem?.task.name}`}
                                        </Text>
                                      </ProSpace>
                                    </Col>

                                    {listItem.start_time !== null && listItem.end_time === null ? (
                                      <Col span={6} className="card-left-content">
                                        <Statistic
                                          title=" Start Time"
                                          value={getRequiredDateFormat(
                                            listItem?.start_time,
                                            'MM-DD-YYYY HH:mm:ss',
                                          )}
                                        />
                                        <Button
                                          size="large"
                                          type="primary"
                                          icon={<HistoryOutlined spin />}
                                          onClick={() => {
                                            const values = {
                                              end_time: new Date().toISOString(),
                                            };
                                            stopTimer(listItem.id, values);
                                          }}
                                        >
                                          Stop
                                        </Button>
                                      </Col>
                                    ) : (
                                      <Col span={6} className="card-left-content">
                                        <Text className="time-hours">
                                          {listItem?.duration?.slice(0, -3)}
                                          {/* {listItem?.duration === '00:00:00'
                                            ? getDuration(listItem.start_time, listItem.end_time)
                                            : listItem?.duration?.slice(0, -3)} */}
                                        </Text>
                                        <Button
                                          disabled
                                          size="large"
                                          icon={<ClockCircleOutlined />}
                                          onClick={() => {
                                            const values = {
                                              start_time: new Date().toISOString(),
                                              project: listItem?.project?.id,
                                              task: listItem?.task.id,
                                            };
                                            // restartTimer(values)
                                          }}
                                        >
                                          Start
                                        </Button>
                                      </Col>
                                    )}
                                  </Row>
                                ) : null}
                              </Col>
                            </Row>
                          );
                        }}
                      />
                      {/* TODO Total Time of the day */}
                    </TabPane>
                  );
                })
              )}
            </Tabs>
          </div>
        </Col>
      </Row>
      {newEntryModalVisible && (
        <NewEntryModal
          selectedKey={selectedTabKey}
          visible={newEntryModalVisible}
          setVisibility={setNewEntryModalVisible}
          onSuccess={(key: string) => {
            getWeekData(key);
          }}
        />
      )}
    </ProGridContainer>
  );
};

export default TimeSheet;
