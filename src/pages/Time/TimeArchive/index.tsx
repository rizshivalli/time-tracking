import { ProGridContainer, ProIntlProvider, ProSpace, ProTitle, RandomQuote } from '@/common';
import ProTable from '@ant-design/pro-table';
import { Button, Col, Input, Menu, Row, Dropdown } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { getArchivedApprovals } from '../service';
import './index.less';
import { Link } from 'umi';
import { Skeleton } from 'antd';

const { Search } = Input;

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Approved By',
    dataIndex: 'user_name',
    render: (text, value) => <div>{value?.approved_by?.full_name}</div>,
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
    title: 'Operation',
    key: 'option',
    width: 120,
    valueType: 'option',
    // @ts-ignore
    render: (_, row, index, action) => [
      <Link key="a" to={`/time/time-sheet/archive/${row.id}`}>
        <Button>View TimeSheet</Button>
      </Link>,
    ],
  },
];

const TimeArchive = () => {
  const actionRef = useRef<ActionType>();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getArchivedData = async () => {
    setLoading(true);
    await getArchivedApprovals({})
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
    getArchivedData();
  }, []);

  const searchData = async (params: {} = {}) => {
    await getArchivedApprovals(params)
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
            <ProTitle size={3}>Archive</ProTitle>
            <Col span={6} className="file">
              {/* <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Input size="middle" placeholder="Search" prefix={<SearchOutlined />} />
                    </Menu.Item>
                    <Menu.Item key="1">[SAMPLE] Hiromi Hourglass</Menu.Item>
                    <Menu.Item key="2">[SAMPLE] Kiran Kronological</Menu.Item>
                    <Menu.Item key="3">[SAMPLE] Tamara Timekeeper</Menu.Item>
                    <Menu.Item key="4">Sample Role</Menu.Item>
                    <Menu.Item key="5">Minhaj Ahamed</Menu.Item>
                    <Menu.Item key="6">Minhaj Ahamed</Menu.Item>
                  </Menu>
                }
              >
                <Button className="Show_everyone_btn">
                  Show: Everyone <DownOutlined />
                </Button>
              </Dropdown> */}
              <Search onSearch={onChange} allowClear size="middle" placeholder="Employee Name" />
            </Col>
            <Skeleton loading={loading} active>
              <ProIntlProvider>
                <ProTable
                  locale={{
                    emptyText: <RandomQuote />,
                  }}
                  dataSource={data}
                  // request={async () => {
                  //   const data = await getArchivedApprovals();
                  //   return { data };
                  // }}
                  columns={columns}
                  actionRef={actionRef}
                  rowKey="id"
                  search={false}
                  pagination={false}
                  dateFormatter="string"
                  toolBarRender={false}
                />
              </ProIntlProvider>
            </Skeleton>
          </ProSpace>
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default TimeArchive;
