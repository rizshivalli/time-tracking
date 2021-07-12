import { ProDivider, ProGridContainer } from '@/common';
import React, { useState } from 'react';
import { Col, Row, Progress, Checkbox, Tooltip, Tabs, DatePicker, Skeleton } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ProjectsReports, TeamsReports, TasksReports } from '../Components';
import {
  dashboardDateRanges,
  getRequiredDateFormat,
  getToday,
  initialDateRanges,
} from '@/utils/MomentHelpers';
import './index.less';
import { getClientsReportById } from '../service';
import { useEffect } from 'react';
import { history } from 'umi';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const today = getToday('YYYY-MM-DD');
const ClientTime = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const getClientReport = async (startDate: string = '2000-01-01', endDate: string = today) => {
    setLoading(true);
    await getClientsReportById(id, startDate, endDate)
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
      getClientReport(startDate, endDate);
    } else {
      getClientReport('2000-01-01', today);
    }
  };

  useEffect(() => {
    getClientReport();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col span={24} className="AllTime">
          <p className="Main_title">Client Report</p>
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
        <Row>
          <Col span={24} className="Clients_Names_Wraps">
            <a onClick={() => history.goBack()}>
              Time Report <RightOutlined />
            </a>
            <p>{data?.name}</p>
          </Col>
        </Row>
        <Row className="Report_rowmap">
          <Col span={4} className="Report_Head_Content">
            <div className="paragraphs">
              <div className="head_title">Hours Tracked</div>
              <div className="amount_title">262.45</div>
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
                <strong> 127.53</strong> Non-Billable
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
              <Tabs defaultActiveKey="1">
                <TabPane tab="Projects" key="1">
                  <ProjectsReports data={data?.project_hours} />
                </TabPane>
                <TabPane tab="Task" key="2">
                  <TasksReports data={data?.task_hours} />
                </TabPane>
                <TabPane tab="Team" key="3">
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

export default ClientTime;
