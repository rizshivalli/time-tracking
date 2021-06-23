import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Col, DatePicker, Button, Menu, Row, Dropdown } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ActionType } from '@ant-design/pro-table';
import { getUnsubmittedTimesheets } from '../service';
import {
  getStartAndEndOfWeek,
  getRequiredDateFormat,
  getStartAndEndOfWeekString,
} from '@/utils/MomentHelpers';
import './index.less';
import { Skeleton } from 'antd';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    hideInTable: true,
  },
  {
    title: 'Employee Name',
    dataIndex: 'user_name',
  },
  {
    title: 'Date Range',
    dataIndex: 'date_range',
  },
  {
    title: 'Submitted by',
    dataIndex: 'user_name',
    render: (text: string, value: any) => <div>{value?.submitted_by?.full_name}</div>,
  },
  {
    title: '',
    key: 'option',
    width: 120,
    valueType: 'option',
    // @ts-ignore
    render: (_, row, index, action) => [
      <Link to={`/time/time-sheet/unsubmitted/${row.id}`}>
        <Button key="a" onClick={() => {}}>
          View TimeSheet
        </Button>
      </Link>,
    ],
  },
];

// const beforeSearch = (params: any) => {
//   console.log('🚀 ~ file: index.tsx ~ line 36 ~ beforeSearch ~ params', params);
//   replaceKey(params, 'user_name', 'user_name_contains');
//   if (params.date_range) {
//     const dates = getStartAndEndOfWeek(getRequiredDateFormat(params.date_range, 'YYYY-MM-DD'));
//     delete params?.date_range;
//     params = { ...params, ...dates };
//   }

//   return params;
// };

const Unsubmitted = () => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [weekRange, setWeekRange] = useState<string>('');

  const getUnsubmittedData = async () => {
    setLoading(true);
    await getUnsubmittedTimesheets({})
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUnsubmittedData();
  }, []);

  const searchData = async (params: {} = {}) => {
    await getUnsubmittedTimesheets(params)
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

  const handleWeekChange = (a: any) => {
    const parsedDate = getRequiredDateFormat(a, 'YYYY-MM-DD');
    const dates = getStartAndEndOfWeek(getRequiredDateFormat(parsedDate, 'YYYY-MM-DD'));
    setWeekRange(getStartAndEndOfWeekString(parsedDate));
    searchData(dates);
  };

  return (
    <ProGridContainer>
      <Skeleton loading={loading} active>
        <Row>
          <Col span={24}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <ProTitle size={3}>Unsubmitted</ProTitle>
              <Col span={12} className="left">
                <ProSpace direction="horizontal" style={{ width: '100%' }}>
                  <DatePicker
                    size="large"
                    picker="week"
                    onChange={handleWeekChange}
                    placeholder="Select Week"
                  />
                  <p>
                    <strong>{weekRange}</strong>
                  </p>
                </ProSpace>
              </Col>

              <ProIntlProvider>
                <ProTable
                  locale={{
                    emptyText: <RandomQuote />,
                  }}
                  dataSource={data}
                  columns={columns}
                  actionRef={actionRef}
                  rowKey="id"
                  search={false}
                  pagination={false}
                  dateFormatter="string"
                  toolBarRender={false}
                />
              </ProIntlProvider>
            </ProSpace>
          </Col>
          <Col span={24}>
            <Button type="primary" size="middle" className="Send_Mail_BtnWrap">
              {' '}
              Send Email Remainder
            </Button>
          </Col>
        </Row>
      </Skeleton>
    </ProGridContainer>
  );
};

export default Unsubmitted;
