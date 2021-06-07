import { ProGridContainer, ProIntlProvider } from '@/common';
import { Button, Col, message, Row, Progress } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getPendingApprovalByID, approveTimesheet } from '../../service';
import { humanize, createTableColumns } from '@/utils/generalUtils';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { CheckOutlined, MailOutlined } from '@ant-design/icons';
import './index.less';

const ApprovalDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>({});
  const actionRef = useRef<ActionType>();

  const createTablekey = (data: any[]) => {
    let tableKeysArray = [];
    if (data) {
      const requiredData = data[0];
      for (const key in requiredData) {
        const individualData = key;
        if (key !== 'project_id' && key !== 'task_id' && key !== 'id') {
          let tablerow = createTableColumns(
            humanize(individualData),
            individualData,
            individualData,
          );
          tableKeysArray.push(tablerow);
        }
      }
    }
    return tableKeysArray;
  };

  const getDataForApproval = async () => {
    setLoading(true);
    await getPendingApprovalByID(id)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setData([]);
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDataForApproval();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col span={24} className="heading">
          <div className="head_title">
            <h1>Approve [SAMPLE] Kiran’s Timesheet for 24 – 30 May 2021</h1>
            <p>[SAMPLE] Client A (Fixed Fee Project)</p>
          </div>
        </Col>
        <Col span={6}>
          <div className="paragraphs">
            <p>Hours Tracked</p>
            <h2>6:40</h2>
          </div>
        </Col>
        <Col span={4} className="progress_bar">
          <Progress type="circle" percent={99} width={80} />
        </Col>
        <Col span={8} className="Circle_Wraps">
          <div className="left_text">
            <p className="Billable_Hourse">Billable Hours</p>
          </div>
          <div className="left_text">
            <p className="green_box"></p>
            <p>
              <strong> 6:40 Billable</strong>
            </p>
          </div>
          <div className="left_text">
            <p className="skyblue_box"></p>
            <p>
              <strong> 0:00 Non-Billable</strong>
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div className="paragraphs">
            <p>Expenses</p>
            <h2>$0.00</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {' '}
          <ProIntlProvider>
            <h2>Pending Hours</h2>
            <ProTable
              loading={loading}
              actionRef={actionRef}
              // @ts-ignore
              columns={createTablekey(data?.time_records)}
              dataSource={data?.time_records}
              rowKey="id"
              search={false}
            />
          </ProIntlProvider>
        </Col>
        <Col span={24}>
          <Button
            className="Approvel_button"
            size="large"
            key="2"
            type="primary"
            onClick={async () => {
              setLoading(true);
              await approveTimesheet(id)
                .then(() => {
                  actionRef?.current?.reload();
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
            disabled={loading || data?.status === 'Approved'}
          >
            <CheckOutlined />
            {data?.status !== 'Approved' ? `Approve Timesheet` : `Approved Timesheet`}
          </Button>
          ,
          <Button
            className="Approvel_button"
            size="large"
            key="3"
            type="primary"
            onClick={() => {}}
            disabled={loading}
          >
            <MailOutlined />
            Email {data?.user_name}
          </Button>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default ApprovalDetails;
