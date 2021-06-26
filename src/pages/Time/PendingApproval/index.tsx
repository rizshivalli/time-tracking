import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Button, Col, Row, Menu, Dropdown, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownOutlined } from '@ant-design/icons';
import { getPendingApprovals } from '../service';
import { Link } from 'umi';
import './index.less';
import { Skeleton } from 'antd';

const { Search } = Input;
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
      <Link to={`/time/time-sheet/approve/${row.id}`}>
        <Button key="a" onClick={() => {}}>
          View TimeSheet
        </Button>
      </Link>,
    ],
  },
];

const PendingApproval = () => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUnsubmittedData = async () => {
    setLoading(true);
    await getPendingApprovals({})
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
    await getPendingApprovals(params)
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

  const onChange = (e: string) => {
    const params = { 'submitted_by.full_name_contains': e };
    searchData(params);
  };

  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProTitle size={3}>Pending Approval</ProTitle>
            <Col span={24} className="pending_sorted_Btns">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">Weeks</Menu.Item>
                    <Menu.Item key="2">Projects</Menu.Item>
                    <Menu.Item key="3">People</Menu.Item>
                  </Menu>
                }
              >
                <Button className="sorted_projects">
                  Sorted By: Projects <DownOutlined />
                </Button>
              </Dropdown>

              <div className="Everyone_Btns">
                <Search onSearch={onChange} allowClear size="middle" placeholder="Employee Name" />
              </div>
            </Col>
            <Skeleton loading={loading} active>
              <ProIntlProvider>
                <ProTable
                  pagination={false}
                  search={false}
                  locale={{
                    emptyText: <RandomQuote />,
                  }}
                  dataSource={data}
                  columns={columns}
                  actionRef={actionRef}
                  editable={{
                    type: 'multiple',
                  }}
                  rowKey="id"
                  dateFormatter="string"
                  toolBarRender={false}
                />
              </ProIntlProvider>
              {data.length > 0 && <Button type="primary">Approve Timesheets</Button>}
            </Skeleton>
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default PendingApproval;
