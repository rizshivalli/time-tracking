import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Col, DatePicker, Row } from 'antd';
import React, { useRef } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { Link } from 'react-router-dom';
import type { ActionType } from '@ant-design/pro-table';
import { getPendingApprovals } from '../service';
import { replaceKey } from '@/utils/utils';
import { getStartAndEndOfWeek, getRequiredDateFormat } from '@/utils/MomentHelpers';

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Employee Name',
    dataIndex: 'user_name',
    render: (text, value) => <Link to={`/time/time-sheet/approve/${value.id}`}>{text}</Link>,
  },
  {
    title: 'Date Range',
    dataIndex: 'date_range',
    renderFormItem: (item, props) => {
      return <DatePicker picker="week" {...props} bordered={true} format="YYYY-MM-DD" />;
    },
  },
  {
    title: 'Submitted by',
    dataIndex: 'user_name',
    render: (text, value) => <div>{value?.submitted_by?.full_name}</div>,
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
            <ProIntlProvider>
              <ProTable
                beforeSearchSubmit={beforeSearch}
                request={async () => {
                  const data = await getPendingApprovals();
                  return { data };
                }}
                columns={columns}
                actionRef={actionRef}
                editable={{
                  type: 'multiple',
                }}
                rowKey="id"
                search={{
                  labelWidth: 'auto',
                }}
                pagination={{
                  pageSize: 5,
                }}
                dateFormatter="string"
                toolBarRender={false}
              />
            </ProIntlProvider>
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default Unsubmitted;
