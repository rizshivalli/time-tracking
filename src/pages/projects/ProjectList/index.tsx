import { ProGridContainer, ProIntlProvider, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExportProjectsModal from './components/ExportProjectsModal';
import ImportProjects from './components/ImportProjects';
import './index.less';
import { getProjects, getProjectsCount } from '../service';

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
      title: 'Task',
      dataIndex: 'name',
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
      title: 'Cost',
      dataIndex: 'cost',
    },
  ];

  return (
    <ProGridContainer>
      <Row>
        <Col span={24}>
          <ProSpace direction="vertical" style={{ width: '100%' }}>
            <ProSpace direction="horizontal">
              <Link to="/projects/new">
                <Button className="left-button" icon={<PlusOutlined />}>
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

            <ProIntlProvider>
              <ProTable
                request={async (params = {}) => {
                  const data = await getProjects(params);
                  const count = await getProjectsCount();
                  return {
                    data,
                    page: params.current,
                    success: true,
                    total: count,
                  };
                }}
                // dataSource={data}
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

/* <table>
            <tr>
              <td>name</td>
              <td>Project name</td>
              <td>budget</td>
              <td>costs</td>
            </tr>

            {data.map((item) => {
              const { id, client_id, client_name, project_name, budget, costs } = item;
              return (
                <tr key={id}>
                  <td>{client_name}</td>
                  <td>{project_name}</td>
                  <td>{budget}</td>
                  <td>{costs}</td>
                </tr>
              );
            })}
          </table> */
