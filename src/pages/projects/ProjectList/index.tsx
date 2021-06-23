import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace, RandomQuote } from '@/common';
import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Dropdown, Menu, Row, Input, Skeleton, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ExportProjectsModal from './components/ExportProjectsModal';
import ImportProjects from './components/ImportProjects';
import './index.less';
import { archiveProject, getProjects } from '../service';
import { Link } from 'umi';
import { hasAccess } from '@/utils/token';

const { Search } = Input;

const checkAccess = async () => {
  const access = await hasAccess();
  return access;
};

const ProjectList = () => {
  const actionRef = useRef<ActionType>();
  const [importModalVisible, setImportModalVisibility] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const getData = async (params: {} = {}) => {
    setLoading(true);
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

  const searchData = async (params: {} = {}) => {
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
            {checkAccess() ? (
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
          disabled={!checkAccess()}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link to={`/project/${record.id}`}>Edit</Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={async () => {
                  const hide = message.loading('Action in progress..', 0);
                  const params = { archived: true };
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
    const params = { name_contains: e };
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
                    disabled={!checkAccess()}
                  >
                    New Project
                  </Button>
                </Link>
                <Button
                  disabled={!checkAccess()}
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
                  <Menu.Item>
                    <Input size="middle" placeholder="Search" prefix={<SearchOutlined />} />
                  </Menu.Item>
                  <Menu.Item key="1">Everyone</Menu.Item>
                  <Menu.Item key="2">My Pinnted Teammates</Menu.Item>
                  <Menu.Item key="3">My Pinned Projects</Menu.Item>
                  <Menu.Item key="4">Sample Role</Menu.Item>
                </Menu>
              }
            >
              <Button className="Active_projects">
                Active Projects <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={20} className="filtered_butons">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Input size="middle" placeholder="Search" prefix={<SearchOutlined />} />
                  </Menu.Item>
                  <Menu.Item key="1">Everyone</Menu.Item>
                  <Menu.Item key="2">My Pinnted Teammates</Menu.Item>
                  <Menu.Item key="3">My Pinned Projects</Menu.Item>
                  <Menu.Item key="4">Sample Role</Menu.Item>
                </Menu>
              }
            >
              <Button className="Filter_by">
                Filter By Client <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Input size="middle" placeholder="Search" prefix={<SearchOutlined />} />
                  </Menu.Item>
                  <Menu.Item key="1">Everyone</Menu.Item>
                  <Menu.Item key="2">My Pinnted Teammates</Menu.Item>
                  <Menu.Item key="3">My Pinned Projects</Menu.Item>
                  <Menu.Item key="4">Sample Role</Menu.Item>
                </Menu>
              }
            >
              <Button className="Filter_by">
                Filter By Manager <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={24}>
            <ProSpace direction="vertical" style={{ width: '100%' }}>
              <ProIntlProvider>
                <ProTable
                  locale={{
                    emptyText: <RandomQuote />,
                  }}
                  dataSource={data}
                  pagination={false}
                  columns={columns}
                  actionRef={actionRef}
                  editable={{
                    type: 'multiple',
                  }}
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
              onSuccess={actionRef?.current?.reload()}
            />
            <ExportProjectsModal
              visible={exportModalVisible}
              setVisibility={setExportModalVisibility}
            />
          </Col>
        </Row>
      </Skeleton>
    </ProGridContainer>
  );
};

export default ProjectList;
