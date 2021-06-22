import React, { useEffect, useState } from 'react';
import { ProDivider, ProGridContainer } from '@/common';
import { Col, Row, Progress, Checkbox, Tooltip, Tabs, Skeleton, DatePicker } from 'antd';
import { ProjectsReports, TeamsReports, TasksReports, ClientsReports } from './Components';
import './index.less';
import { getInitialReport } from './service';
import {
  dashboardDateRanges,
  getRequiredDateFormat,
  getToday,
  initialDateRanges,
} from '@/utils/MomentHelpers';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const today = getToday('YYYY-MM-DD');

const TimeReports = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState('1');

  const getDataReport = async (startDate: string = '2000-01-01', endDate: string = today) => {
    setLoading(true);
    await getInitialReport(startDate, endDate)
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
      getDataReport(startDate, endDate);
    } else {
      getDataReport('2000-01-01', today);
    }
  };

  const onTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  useEffect(() => {
    getDataReport();
  }, []);
  return (
    <ProGridContainer>
      <Row>
        <Col span={24} className="AllTime">
          <p className="Main_title">Reports</p>
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
      <Skeleton active loading={loading}>
        <Row className="Report_rowmap">
          <Col span={4} className="Report_Head_Content">
            <div className="paragraphs">
              <div className="head_title">Hours Tracked</div>
              <div className="amount_title">{data?.total_hours}</div>
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
                <strong>0 </strong> Billable
              </p>
            </div>
            <div className="left_text">
              <p className="skyblue_box"></p>
              <p>
                <strong>{data?.total_hours}</strong> Non-Billable
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
        <ProDivider />
        <Row>
          <Col span={24}>
            <div className="Task_Projects_Tabs">
              <Tabs defaultActiveKey="1" onChange={onTabChange} activeKey={activeTab}>
                <TabPane tab="Clients" key="1">
                  <ClientsReports data={data?.client_hours} />
                </TabPane>
                <TabPane tab="Projects" key="2">
                  <ProjectsReports data={data?.project_hours} />
                </TabPane>
                <TabPane tab="Task" key="3">
                  <TasksReports data={data?.task_hours} />
                </TabPane>
                <TabPane tab="Team" key="4">
                  <TeamsReports data={data?.member_hours} />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Skeleton>
    </ProGridContainer>
  );
};

export default TimeReports;
