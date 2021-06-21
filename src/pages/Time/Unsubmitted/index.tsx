import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, DatePicker, Button, Menu, Row, Dropdown } from 'antd';
import React, { useRef } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { Link } from 'react-router-dom';
import type { ActionType } from '@ant-design/pro-table';
import { DownOutlined } from '@ant-design/icons';
import { getUnsubmittedTimesheets } from '../service';
import { replaceKey } from '@/utils/utils';
import { getStartAndEndOfWeek, getRequiredDateFormat } from '@/utils/MomentHelpers';
import './index.less';

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
    render: (text, value) => <div>{value?.submitted_by?.full_name}</div>,
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

const beforeSearch = (params: any) => {
  console.log('🚀 ~ file: index.tsx ~ line 36 ~ beforeSearch ~ params', params);
  replaceKey(params, 'user_name', 'user_name_contains');
  if (params.date_range) {
    const dates = getStartAndEndOfWeek(getRequiredDateFormat(params.date_range, 'YYYY-MM-DD'));
    delete params?.date_range;
    params = { ...params, ...dates };
  }

  console.log('🚀 ~ file: index.tsx ~ line 73 ~ beforeSearch ~ params', params);

  return params;
};
const Unsubmitted = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProTitle size={3}>Unsubmitted</ProTitle>
            <Col span={6}>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">07 jun 2021 - 13 jun 2021</Menu.Item>
                    <Menu.Item key="2">This Week</Menu.Item>
                    <Menu.Item key="2">24 May 2021 - 30 May 2021</Menu.Item>
                    <Menu.Item key="2">17 May 2021 - 23 May 2021</Menu.Item>
                    <Menu.Item key="2">10 May 2021 - 16 May 2021</Menu.Item>
                    <Menu.Item key="2">- Shows All Weeks -</Menu.Item>
                  </Menu>
                }
              >
                <Button className="Unsubmitted_thisWeek_wraps">
                  This Week <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <ProIntlProvider>
              <ProTable
                locale={{
                  emptyText: <RandomQuote />,
                }}
                beforeSearchSubmit={beforeSearch}
                request={async () => {
                  const data = await getUnsubmittedTimesheets();
                  return { data };
                }}
                columns={columns}
                actionRef={actionRef}
                editable={{
                  type: 'multiple',
                }}
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
    </ProGridContainer>
  );
};

export default Unsubmitted;
