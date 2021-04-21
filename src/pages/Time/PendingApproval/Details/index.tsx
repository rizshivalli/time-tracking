import { ProGridContainer, ProIntlProvider } from '@/common';
import { Button, Col, message, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getPendingApprovalByID, approveTimesheet } from '../../service';
import { humanize, createTableColumns } from '@/utils/generalUtils';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { CheckOutlined, MailOutlined } from '@ant-design/icons';

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
        message.error(error);
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
        <Col span={24}>
          {' '}
          <ProIntlProvider>
            <ProTable
              headerTitle={
                !loading &&
                ` Approve ${humanize(data?.user_name)}'s Timesheet for ${data.date_range} `
              }
              loading={loading}
              actionRef={actionRef}
              // @ts-ignore
              columns={createTablekey(data?.time_records)}
              dataSource={data?.time_records}
              rowKey="id"
              toolBarRender={() => [
                <Button
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
                </Button>,
                <Button size="large" key="3" type="primary" onClick={() => {}} disabled={loading}>
                  <MailOutlined />
                  Email {data?.user_name}
                </Button>,
              ]}
              search={false}
            />
          </ProIntlProvider>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default ApprovalDetails;
