import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace, RandomQuote } from '@/common';
import { getRequiredDateFormat, getStartAndEndOfWeekString, getToday } from '@/utils/MomentHelpers';
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  DownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  Button,
  Col,
  Row,
  Statistic,
  Progress,
  Menu,
  Dropdown,
  Input,
  Skeleton,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import { archiveTeamMembers, exportTeamCSV, getTeamMembers } from '../service';
import { ImportPeopleModal } from './components';
import { saveAs } from 'file-saver';
import { hasAccess } from '@/utils/token';
import './index.less';
import { calulateTotalWeekTime } from '@/utils/generalUtils';

const { Search } = Input;
const todayDate = getToday('YYYY-MM-DD');
const thisWeek = getStartAndEndOfWeekString(todayDate);

const access = hasAccess();

const TeamHome = () => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [importModalVisible, setImportModalVisibility] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<any>({ is_archived: false });

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      render: (text, row) => <Link to={`/teams/summary/${row?.id}`}>{row?.full_name}</Link>,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
    },
    {
      title: 'Work Email',
      dataIndex: 'email',
    },
    {
      title: 'Total Hours',
      dataIndex: 'total_hours',
      render: (text, row) => <div>{calulateTotalWeekTime(row?.time_records)}</div>,
    },
    {
      title: 'Total Capacity',
      dataIndex: 'capacity',
    },
    {
      title: '',
      width: 120,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <Dropdown
          disabled={!access}
          overlay={
            <Menu>
              <Menu.Item
                key="2"
                onClick={async () => {
                  const hide = message.loading('Action in progress..', 0);
                  const params = { is_archived: true };
                  archiveTeamMembers(record.id, params)
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {
                      fetchData();
                      hide();
                    });
                }}
              >
                Archive
              </Menu.Item>
            </Menu>
          }
        >
          <Button className="Team_BtnsWrpas">
            Options <DownOutlined />
          </Button>
        </Dropdown>,
      ],
    },
  ];

  const fetchData = async (params: {} = filterParams) => {
    setLoading(true);
    await getTeamMembers(params)
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

  const searchData = async (params: {} = filterParams) => {
    await getTeamMembers(params)
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

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (e: string) => {
    const params = { full_name_contains: e };
    searchData({ ...filterParams, ...params });
    setFilterParams((existingParams: any) => {
      return { ...existingParams, full_name_contains: e };
    });
  };

  const downloadTeamReport = async (key: any) => {
    const hide = message.loading('Please wait while we download your file..', 0);
    await exportTeamCSV(filterParams)
      .then((data) => {
        saveAs(
          data,
          `All Teams ${getRequiredDateFormat(new Date(), 'MM-DD-YYYY HH-mm-ss')}.${key}`,
        );
        message.success('Report File generated successfully');
      })
      .catch((error) => {
        message.error('Error occured while generating report');
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <ProGridContainer>
      <Skeleton loading={loading} active avatar>
        <Row>
          <Col span={16}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <ProSpace>
                <Link to="/people/new">
                  <Button
                    type="primary"
                    className="Team_add_person"
                    icon={<PlusOutlined />}
                    disabled={!access}
                  >
                    Add Person
                  </Button>
                </Link>
                <Button
                  disabled={!access}
                  className="Team_BtnsWrpas"
                  onClick={() => {
                    setImportModalVisibility(true);
                  }}
                >
                  Import
                </Button>

                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="1"
                        onClick={async () => {
                          await downloadTeamReport('csv');
                        }}
                      >
                        Export CSV
                      </Menu.Item>
                      <Menu.Item
                        disabled
                        key="2"
                        onClick={async () => {
                          await downloadTeamReport('xls');
                        }}
                      >
                        Export EXCEL
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button className="Team_BtnsWrpas">
                    Export <DownOutlined />
                  </Button>
                </Dropdown>
              </ProSpace>
            </ProSpace>
          </Col>
          <Col span={8}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <Search
                onSearch={onChange}
                allowClear
                size="middle"
                placeholder="Search by employee name"
              />
            </ProSpace>
          </Col>
          <ProDivider />
          <Col span={24} className="left">
            {/* <Button icon={<LeftOutlined />}></Button>
            <Button icon={<RightOutlined />}></Button> */}
            <p>
              <strong>This Week :</strong> {thisWeek}
            </p>
          </Col>
        </Row>
        <ProDivider />
        <Row className="list_row">
          <Col span={4} className="List_Cards_Wraps">
            <ProSpace size="large">
              <Statistic title="Total Hours" value={80.0} precision={2} />
              <ProDivider type="vertical" />
            </ProSpace>
          </Col>
          <Col span={4} className="List_Cards_Wraps">
            <ProSpace size="large">
              <Statistic title="Team Capacity" value={210.0} precision={2} />
              <ProDivider type="vertical" />
            </ProSpace>
          </Col>
          <Col span={7} className="List_Cards_Wraps">
            <div className="left_text">
              <p className="green_box"></p>
              <p>
                Billable <strong> 0:00</strong>
              </p>
            </div>
            <div className="left_text">
              <p className="skyblue_box"></p>
              <p>
                Non-Billable <strong>0:00</strong>
              </p>
            </div>
          </Col>
          <Col span={9} className="List_Cards_Wraps">
            <Progress percent={60} success={{ percent: 30 }} />
          </Col>
        </Row>
        <ProDivider />
        <Row>
          <Col span={24}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
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
        </Row>
        <ImportPeopleModal
          visible={importModalVisible}
          setVisibility={setImportModalVisibility}
          onSuccess={fetchData}
        />
      </Skeleton>
    </ProGridContainer>
  );
};

export default TeamHome;
