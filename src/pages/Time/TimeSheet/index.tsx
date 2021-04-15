import { ProGridContainer, ProSpace, ProTitle } from '@/common';
import {
  getWeekFromSuntoSat,
  getToday,
  getRequiredDateFormat,
  getStartAndEndOfWeek,
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
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTimeRecords, stopTimeRecord, submitWeekForApproval } from '../service';
import { NewEntryModal } from './components';
import './index.less';

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

  const getWeekData = useCallback(
    async (key: string) => {
      const newDates = getStartAndEndOfWeek(key);
      setListLoading(true);
      await getTimeRecords(newDates)
        .then((time) => {
          const total = calulateTotalWeekTime(time);
          setWeekTotal(total);

          setWeekData(time);
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
    await submitWeekForApproval(dates);
  };

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
    right: <Tag icon={<ClockCircleOutlined />}>Week Total: {weekTotal && weekTotal}</Tag>,
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
              size="middle"
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
                            <Button
                              // disabled={weekData.length !== 0 ? false : true}
                              onClick={() => {
                                submitWeek();
                              }}
                            >
                              Submit Week for Proposal
                            </Button>
                          </div>
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
                                    <Col span={6} className="card-left-content">
                                      <Text className="time-hours">{listItem?.duration}</Text>
                                      {listItem.duration === null || listItem.end_time === null ? (
                                        <Button
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
                                      ) : (
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
                                      )}
                                    </Col>
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
                })}
            </Tabs>
          </div>
        </Col>
      </Row>
      <NewEntryModal
        selectedKey={selectedTabKey}
        visible={newEntryModalVisible}
        setVisibility={setNewEntryModalVisible}
        onSuccess={getWeekData}
      />
    </ProGridContainer>
  );
};

export default TimeSheet;
