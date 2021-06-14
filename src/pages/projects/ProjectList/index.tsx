import { ProDivider, ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Dropdown, Menu, Row, Input } from 'antd';
import React, { useRef, useState } from 'react';
import ExportProjectsModal from './components/ExportProjectsModal';
import ImportProjects from './components/ImportProjects';
import './index.less';
import { getProjects, getProjectsCount } from '../service';
import { Link } from 'umi';

const ProjectList = () => {
  const actionRef = useRef<ActionType>();
  const [importModalVisible, setImportModalVisibility] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisibility] = useState<boolean>(false);

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      render: (text, row) => <Link to={`/projects/details/${row.id}`}>{row.name}</Link>,
    },
    {
      title: 'client',
      dataIndex: 'client_name',
      render: (text, row) => <div>{row.client?.name}</div>,
    },
    {
      title: 'project_code',
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
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link to={`/project/${record.id}`}>Edit</Link>
              </Menu.Item>
              <Menu.Item key="2">Archive</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Options <DownOutlined />
          </Button>
        </Dropdown>,
      ],
    },
  ];

  return (
    <ProGridContainer>
      <Row>
        <Col span={16}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace direction="horizontal">
              <Link to="/projects/new">
                <Button type="primary" icon={<PlusOutlined />}>
                  Create New Project
                </Button>
              </Link>
              <Button
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
            <Input
              type="Search"
              size="middle"
              prefix={<SearchOutlined />}
              placeholder="Search by client or project name"
            />
          </ProSpace>
        </Col>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProDivider />
            <ProIntlProvider>
              <ProTable
                request={async (params = {}) => {
                  const data = await getProjects();
                  const count = await getProjectsCount();
                  return {
                    data,
                    page: params.current,
                    success: true,
                    total: count,
                  };
                }}
                columns={columns}
                actionRef={actionRef}
                editable={{
                  type: 'multiple',
                }}
                rowKey="id"
                search={false}
                pagination={{
                  pageSize: 5,
                }}
                dateFormatter="string"
                toolBarRender={false}
              />
            </ProIntlProvider>
          </ProSpace>
          <ImportProjects visible={importModalVisible} setVisibility={setImportModalVisibility} />
          <ExportProjectsModal
            visible={exportModalVisible}
            setVisibility={setExportModalVisibility}
          />
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default ProjectList;
