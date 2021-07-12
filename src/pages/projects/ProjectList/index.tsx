import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace, RandomQuote } from '@/common';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Dropdown, Menu, Row, Input, Skeleton, message, Select } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ExportProjectsModal from './components/ExportProjectsModal';
import ImportProjects from './components/ImportProjects';
import { archiveProject, getClients, getProjects } from '../service';
import { Link } from 'umi';
import { hasAccess } from '@/utils/token';
import { CSVLink } from 'react-csv';

import './index.less';

const { Search } = Input;
const access = hasAccess();

const ProjectList = () => {
  const actionRef = useRef<ActionType>();
  const [importModalVisible, setImportModalVisibility] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [filterParams, setFilterParams] = useState<any>({ is_archived: false });
  const [archived, setArchived] = useState<boolean>(false);

  const getData = async (params: {} = { is_archived: false }) => {
    setLoading(true);
    await getClients()
      .then((client) => {
        setClientsData(client);
      })
      .catch(() => {
        setClientsData([]);
      });
    await getProjects(params)
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

  const searchData = useCallback(
    async (params: {} = {}) => {
      setListLoading(true);
      await getProjects(params)
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          setData([]);
        })
        .finally(() => {
          setListLoading(false);
        });
    },
    [filterParams],
  );

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      render: (text, row) => {
        return (
          <div>
            {access ? (
              <Link to={`/projects/details/${row.id}`}>{row.name}</Link>
            ) : (
              <div>{text}</div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Client',
      dataIndex: 'client_name',
      render: (text, row) => <div>{row.client?.name}</div>,
    },
    {
      title: 'Project Code',
      dataIndex: 'project_code',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
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
              <Menu.Item key="1">
                <Link to={`/project/${record.id}`}>Edit</Link>
              </Menu.Item>
              {record.is_archived === false && (
                <Menu.Item
                  key="2"
                  onClick={async () => {
                    const hide = message.loading('Action in progress..', 0);
                    const params = { is_archived: true };
                    archiveProject(record.id, params)
                      .then(() => {})
                      .catch(() => {})
                      .finally(() => {
                        getData();
                        hide();
                      });
                  }}
                >
                  Archive
                </Menu.Item>
              )}
            </Menu>
          }
        >
          <Button className="Projects_OptionsWrpas">
            Options <DownOutlined />
          </Button>
        </Dropdown>,
      ],
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const onChange = (e: string) => {
    setFilterParams((existingParams: any) => {
      return { ...existingParams, name_contains: e };
    });
    const params = { ...filterParams, name_contains: e };
    searchData(params);
  };

  const handleClientChange = (e: string) => {
    setFilterParams((existingParams: any) => {
      return { ...existingParams, 'client.name_contains': e };
    });
    const params = { ...filterParams, 'client.name_contains': e };
    searchData(params);
  };

  return (
    <ProGridContainer>
      <Skeleton loading={loading} active avatar>
        <Row>
          <Col span={16}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <ProSpace direction="horizontal">
                <Link to="/projects/new">
                  <Button
                    type="primary"
                    className="New_project"
                    icon={<PlusOutlined />}
                    disabled={!access}
                  >
                    New Project
                  </Button>
                </Link>
                <Button
                  disabled={!access}
                  className="left-button"
                  onClick={() => {
                    setImportModalVisibility(true);
                  }}
                >
                  Import
                </Button>
                <Button
                  className="left-button"
                  onClick={() => {
                    setExportModalVisibility(true);
                  }}
                >
                  Export
                </Button>
              </ProSpace>
            </ProSpace>
          </Col>
          <Col span={8}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <Search
                onSearch={onChange}
                allowClear
                size="middle"
                placeholder="Search by project name"
              />
            </ProSpace>
          </Col>
          <ProDivider />

          <Col span={4} className="filtered_butons">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      setArchived(false);
                      setFilterParams({ is_archived: false });
                      getData();
                    }}
                  >
                    Active Projects
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    onClick={() => {
                      setArchived(true);
                      setFilterParams({ is_archived: true });
                      searchData({ is_archived: true });
                    }}
                  >
                    Archived Projects
                  </Menu.Item>
                </Menu>
              }
            >
              <Button className="Active_projects">
                {archived ? 'Archived projects' : 'Active Projects'} <DownOutlined />
              </Button>
            </Dropdown>
          </Col>

          <Col span={20} className="filtered_butons">
            <ProSpace>
              <Select
                allowClear
                disabled={!access}
                showSearch
                style={{ width: 200 }}
                placeholder="Filter By Client"
                optionFilterProp="children"
                options={clientsData}
                onChange={handleClientChange}
                filterOption={(input, option) => {
                  // @ts-ignore
                  return option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0;
                }}
              />
              {/* <Button className="left-button">
                <CSVLink filename={'Projects.csv'} data={data}>
                  Export
                </CSVLink>
              </Button> */}
            </ProSpace>
          </Col>

          <Col span={24}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <ProIntlProvider>
                <ProTable
                  loading={listLoading}
                  locale={{
                    emptyText: <RandomQuote />,
                  }}
                  dataSource={data}
                  pagination={false}
                  columns={columns}
                  actionRef={actionRef}
                  rowKey="id"
                  search={false}
                  dateFormatter="string"
                  toolBarRender={false}
                />
              </ProIntlProvider>
            </ProSpace>
            <ImportProjects
              visible={importModalVisible}
              setVisibility={setImportModalVisibility}
              onSuccess={getData}
            />
            <ExportProjectsModal
              visible={exportModalVisible}
              setVisibility={setExportModalVisibility}
              existingParams={filterParams}
            />
          </Col>
        </Row>
      </Skeleton>
    </ProGridContainer>
  );
};

export default ProjectList;
