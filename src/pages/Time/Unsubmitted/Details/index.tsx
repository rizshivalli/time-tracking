import { ProGridContainer, ProIntlProvider, RandomQuote } from '@/common';
import { Button, Col, message, Row, Progress, Skeleton } from 'antd';
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
        message.error(`${error.message}, Please try Again`);
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
      <Skeleton loading={loading} active avatar>
        {data.length !== 0 && (
          <Row>
            <Col span={24} className="heading">
              <div className="head_title">
                <p className="sub_title">{`Unsubmitted ${data?.user_name}’s Timesheet for ${data?.date_range}`}</p>
                {/* <span>[SAMPLE] Client A (Fixed Fee Project)</span> */}
              </div>
            </Col>
            <Col span={5}>
              <div className="paragraphs">
                <span>Hours Tracked</span>
                <p className="paragraphs_title">{data?.total_hours}</p>
              </div>
            </Col>
            <Col span={6} className="progress_bar">
              <Progress type="circle" percent={99} width={80} />
            </Col>
            <Col span={8} className="Circle_Wraps">
              <div className="left_text">
                <span className="Billable_Hourse">Billable Hours</span>
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
            <Col span={5}>
              <div className="paragraphs">
                <span>Expenses</span>
                <p className="paragraphs_title">$0.00</p>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <ProIntlProvider>
              <p className="pending_hours">Unsubmitted Hours</p>
              <ProTable
                locale={{
                  emptyText: <RandomQuote />,
                }}
                options={false}
                loading={loading}
                actionRef={actionRef}
                // @ts-ignore
                columns={createTablekey(data?.time_records)}
                dataSource={data?.time_records}
                rowKey="id"
                search={false}
                pagination={false}
              />
            </ProIntlProvider>
          </Col>
          {/* <Col span={24}>
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
          </Col> */}
        </Row>
      </Skeleton>
    </ProGridContainer>
  );
};

export default ApprovalDetails;
