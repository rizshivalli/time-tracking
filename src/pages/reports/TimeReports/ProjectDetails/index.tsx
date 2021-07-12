import { ProDivider, ProGridContainer } from '@/common';
import React, { useState } from 'react';
import { Col, Row, Button, Progress, Checkbox, Tooltip, Tabs, DatePicker, Skeleton } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { TeamsReports, TasksReports } from '../Components';
import {
  dashboardDateRanges,
  getRequiredDateFormat,
  getToday,
  initialDateRanges,
} from '@/utils/MomentHelpers';
import './index.less';
import { getProjectsReportById } from '../service';
import { useEffect } from 'react';
import { history } from 'umi';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const today = getToday('YYYY-MM-DD');

const ProjectTime = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const getProjectReport = async (startDate: string = '2000-01-01', endDate: string = today) => {
    setLoading(true);
    await getProjectsReportById(id, startDate, endDate)
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

  const handleRangePickerChange = async (dates: any) => {
    if (dates) {
      const startDate = getRequiredDateFormat(dates[0], 'YYYY-MM-DD');
      const endDate = getRequiredDateFormat(dates[1], 'YYYY-MM-DD');
      getProjectReport(startDate, endDate);
    } else {
      getProjectReport('2000-01-01', today);
    }
  };

  useEffect(() => {
    getProjectReport();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col span={24} className="AllTime">
          <p className="Main_title">Project Report</p>
          <div className="Dropdown">
            <RangePicker
              allowClear
              placeholder={initialDateRanges}
              ranges={dashboardDateRanges}
              onChange={handleRangePickerChange}
              style={{
                width: 256,
              }}
            />
          </div>
        </Col>
      </Row>
      <ProDivider />
      <Skeleton loading={loading} active>
        <Row className="Projects_TimeDetails_Row">
          <Col span={20} className="Projects_Names_Wraps">
            <span>
              <a onClick={() => history.goBack()}>
                Time Report <RightOutlined />
              </a>
            </span>
            <span>
              <a href="">
                {data?.client?.name} <RightOutlined />
              </a>
            </span>
            <p>{`${`[${data?.project_code}]`} ${data?.name} `}</p>
          </Col>
          <Col span={4}>
            <Button size="middle" className="Projects_Notes_Btns">
              Projects View Notes
            </Button>
          </Col>
        </Row>
        <Row className="Report_rowmap">
          <Col span={4} className="Report_Head_Content">
            <div className="paragraphs">
              <div className="head_title">Hours Tracked</div>
              <div className="amount_title">{data?.total_hours}</div>
              <div>
                <p>
                  <a href="">See Project Lifespan</a>
                </p>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className="progress_bar">
              <Progress type="circle" percent={0} width={80} />
            </div>
          </Col>
          <Col span={6} className="Report_Head_Content">
            <div className="left_text">
              <div className="head_title">Billable Hours</div>
            </div>
            <div className="left_text">
              <p className="green_box"></p>
              <p>
                <strong> 0.00 </strong> Billable
              </p>
            </div>
            <div className="left_text">
              <p className="skyblue_box"></p>
              <p>
                <strong> {data?.total_hours}</strong> Non-Billable
              </p>
            </div>
          </Col>
          <Col span={5} className="Report_Head_Content">
            <div className="head_title">Billable Amount</div>
            <div className="amount_title">$0.00</div>
            <div className="project_fee">
              <Checkbox> Include fixed fee projects</Checkbox>
              <Tooltip title="Billable Amounts for fixed fee projects are based on hourly rates. This means the Billable Amount may not match the invoiced amount.">
                <p>?</p>
              </Tooltip>
            </div>
          </Col>
          <Col span={5} className="Report_Head_Content">
            <div className="head_title">Uninvoiced Amount</div>
            <div className="amount_title">$0.00</div>
            <p className="excludes">Excludes fixed fee projects</p>
          </Col>
        </Row>
        <ProDivider></ProDivider>
        <Row>
          <Col span={24}>
            <div className="Task_Projects_Tabs">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Task" key="1">
                  <TasksReports data={data?.task_hours} />
                </TabPane>
                <TabPane tab="Team" key="2">
                  <TeamsReports data={data?.members_hours} />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Skeleton>
    </ProGridContainer>
  );
};

export default ProjectTime;
