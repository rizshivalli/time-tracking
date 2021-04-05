import { ProGridContainer, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Col, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExportProjectsModal from './components/ExportProjectsModal';
import ImportProjects from './components/ImportProjects';
import './index.less';

const data = [
  { id: 1, client_id: 0, client_name: 'abc', project_name: 'planning', budget: 102, costs: 200 },
  {
    id: 2,
    client_id: 0,
    client_name: 'abc',
    project_name: 'development',
    budget: 103,
    costs: 2151,
  },
  { id: 3, client_id: 0, client_name: 'abc', project_name: 'work', budget: 104, costs: 21532 },
  { id: 4, client_id: 1, client_name: 'xyz', project_name: 'testing', budget: 105, costs: 2154 },
  { id: 5, client_id: 1, client_name: 'xyz', project_name: 'deploying', budget: 10, costs: 2154 },
  {
    id: 6,
    client_id: 2,
    client_name: 'abc123',
    project_name: 'preplaning',
    budget: 106,
    costs: 250,
  },
];
console.log('🚀 ~ file: index.tsx ~ line 34 ~ data', data);

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
      dataIndex: 'project_name',
    },
    {
      title: 'client',
      dataIndex: 'client_name',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
    },
  ];

  return (
    <ProGridContainer>
      <ProSpace className="top-action-container">
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

      <Row>
        <Col span={24}>
          {/* <table>
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
          </table> */}

          <ProTable
            dataSource={data}
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
        </Col>
      </Row>
      <ImportProjects visible={importModalVisible} setVisibility={setImportModalVisibility} />
      <ExportProjectsModal visible={exportModalVisible} setVisibility={setExportModalVisibility} />
    </ProGridContainer>
  );
};

export default ProjectList;
