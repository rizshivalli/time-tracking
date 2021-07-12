import { ProDivider, RandomQuote } from '@/common';
import React, { useEffect, useState } from 'react';
import {
  LeftOutlined,
  RightOutlined,
  HighlightOutlined,
  PicRightOutlined,
  EditOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Col, Row, Button, Dropdown, Menu, Progress, DatePicker, message } from 'antd';
import './index.less';
import { archiveTeamMembers, getMembersSummarry } from '../../service';
import {
  getToday,
  getStartAndEndOfWeek,
  getStartAndEndOfWeekString,
  getRequiredDateFormat,
} from '@/utils/MomentHelpers';
import { Skeleton } from 'antd';
import { history } from 'umi';
import Empty from 'antd/es/empty';
import { humanize } from '@/utils/generalUtils';

const todayDate = getToday('YYYY-MM-DD');
const thisWeekDates = getStartAndEndOfWeek(todayDate);
const thisWeek = getStartAndEndOfWeekString(todayDate);

const TeamDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [weekRange, setWeekRange] = useState<string>(thisWeek);

  const handleWeekChange = (a: any) => {
    if (a) {
      const parsedDate = getRequiredDateFormat(a, 'YYYY-MM-DD');
      const dates = getStartAndEndOfWeek(getRequiredDateFormat(parsedDate, 'YYYY-MM-DD'));
      const date = { start_date: dates.start_date };
      setWeekRange(getStartAndEndOfWeekString(parsedDate));
      getData(date);
    } else {
      setWeekRange(thisWeek);
      getData();
    }
  };

  const getData = async (params: any = { start_date: thisWeekDates.start_date }) => {
    setLoading(true);
    await getMembersSummarry(id, params)
      .then((data) => {
        setData(data);
        setError(false);
      })
      .catch((err) => {
        setData([]);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <p className="backTeam_wraps" onClick={() => history.goBack()}>
          <LeftOutlined /> Back to Team
        </p>
      </Col>
      <Col span={24} className="WeekTeamwraps">
        {/* <Button className="Teambtns">
          <LeftOutlined />
        </Button>
        <Button className="Teambtns">
          <RightOutlined />
        </Button> */}
        <DatePicker
          size="large"
          picker="week"
          onChange={handleWeekChange}
          placeholder="Select Week"
        />
        <p>
          <strong>Week</strong>: {weekRange}
        </p>
        <span className="ReturnHome_wraps" onClick={handleWeekChange}>
          <a>Return to This Week</a>
        </span>
      </Col>
      <ProDivider />
      <Skeleton loading={loading} active>
        {/* || data?.total_time === '00:00' */}
        {error ? (
          <Row className="error-container">
            <Col span={24} className="error-children">
              <RandomQuote />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={18} className="Team_textblow_Wraps">
              <div className="noteWraps">
                <div className="icons_wraps">
                  <PicRightOutlined />
                </div>
                <div className="Team_UserName_Wraps">{data?.full_name}</div>

                <span className="adminnote_wraps">{humanize(data?.permission)}</span>
                {/* <p>Sample Role</p> */}
                <p>{data?.email}</p>
              </div>
            </Col>
            <Col span={6} className="TeamEdit_Wraps">
              <Button className="TeamEditsWraps_btns" disabled>
                <HighlightOutlined /> Edit Profile
              </Button>
              <Dropdown
                overlay={
                  <Menu>
                    {/* <Menu.Item key="1">Pin</Menu.Item> */}
                    {!data?.is_archived && (
                      <Menu.Item
                        key="2"
                        onClick={async () => {
                          const hide = message.loading('Action in progress..', 0);
                          const params = { is_archived: true };
                          archiveTeamMembers(id, params)
                            .then(() => {})
                            .catch(() => {})
                            .finally(() => {
                              hide();
                              history.goBack();
                            });
                        }}
                      >
                        Archive
                      </Menu.Item>
                    )}
                    <Menu.Item key="3" disabled>
                      Delete
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button className="TeamEditsWraps_btns">
                  Action <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col span={6} className="SlideColors_Wraps">
              <div className="Teambox1_Wrpas">
                <div className="HrsCapFir_wraps">
                  <div className="head">Total Hours</div>
                  <div className="timetake">{data?.total_time}</div>
                </div>
                <div className="HrsCapSec_wraps">
                  <div className="head">Capacity</div>
                  <div className="timetake">35.00</div>
                </div>
                <div className="Progress_Wraps">
                  <Progress percent={60} success={{ percent: 30 }} />
                </div>
                <div className="Teammulticolrwraps">
                  <div className="b1">
                    <div className="Colorsbluewraps"></div>
                    <span>Billable</span>
                  </div>
                  <p>00.00</p>
                  <div className="b2">
                    <div className="Colorslightwraps"></div>
                    <span>Non-Billable</span>
                  </div>
                  <p>{data?.total_time}</p>
                </div>
              </div>
              <div className="Teambox2_Wrpas">
                {data?.day_time?.map((time: any, index: number) => (
                  <div className="TeamDays" key={index}>
                    <p>{time.day.substring(0, 3)}</p>
                    <p>
                      <strong>{time.sum}</strong>
                    </p>
                  </div>
                ))}
              </div>
              <div className="Teambox3_Wrpas">
                <div className="Teambox_head">
                  <p> Projects Breakdown</p>
                </div>
                <div className="Progress_Wraps">
                  {/* <Progress percent={60} success={{ percent: 30 }} /> */}
                </div>

                <div className="Teambox3_trilColors_Wrpas">
                  {data?.project_time.length > 0 ? (
                    data?.project_time?.map((project: any, index: number) => (
                      <>
                        <div className="b1" key={index}>
                          <div
                            className="Colorsgreen_Wraps"
                            style={{
                              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
                                16,
                              )}`,
                            }}
                          />
                          <span>{project.project}</span>
                        </div>
                        <p>{project.sum}</p>
                      </>
                    ))
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
              <div className="Teambox4_Wrpas">
                <div className="Teambox_head">
                  <p> Tasks Breakdown</p>
                </div>
                <div className="Progress_Wraps">
                  {/* <Progress percent={60} success={{ percent: 30 }} /> */}
                </div>
                <div className="Teambox4_trilColors_Wrpas">
                  {data?.task_time.length > 0 ? (
                    data?.task_time?.map((task: any, index: number) => (
                      <>
                        <div className="b1" key={index}>
                          <div
                            className="Colorsgreen_Wraps"
                            style={{
                              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
                                16,
                              )}`,
                            }}
                          />
                          <span>{task.task}</span>
                        </div>
                        <p>{task.sum}</p>
                      </>
                    ))
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </Col>

            <Col span={18} className="TeamTable_Wraps">
              {data?.date_time.length !== 0 ? (
                data?.date_time?.map((data: any, index: number) => {
                  return (
                    <>
                      <div className="TeamTable_HeadTitile_Wraps" key={index}>
                        <p>
                          <strong>{data?.day}</strong>
                        </p>
                        <span>{data?.date}</span>
                      </div>

                      {data?.time_records?.map((record: any, index: number) => (
                        <div className="TeamTable_ContainerWraps" key={index}>
                          <div className="Teamtable_Contentbase_Wraps">
                            <div className="TeamTable_datafoucs_Wraps">
                              <p>
                                <strong>{record?.project} </strong> {record?.client}
                              </p>
                              <p>{record?.task}</p>
                            </div>
                            <div className="TimeTable_Timeicons_wraps">
                              <p>
                                <strong>{record?.duration.slice(0, -3)}</strong>
                              </p>
                              <Button className="IconClick_Btns" disabled>
                                <EditOutlined />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="TeamTable_TotalCount_wraps">
                        Total: <strong>{data?.totalTime}</strong>
                      </p>
                    </>
                  );
                })
              ) : (
                <RandomQuote />
              )}
            </Col>
          </Row>
        )}
      </Skeleton>
    </Row>
  );
};

export default TeamDetails;
