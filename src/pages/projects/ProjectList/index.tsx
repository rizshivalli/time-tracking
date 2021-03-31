import { ProGridContainer, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExportProjectsModal from './components/ExportProjectsModal';
import ImportProjects from './components/ImportProjects';
import './index.less';

const ProjectList = () => {
  const [importModalVisible, setImportModalVisibility] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisibility] = useState<boolean>(false);
  return (
    <ProGridContainer>
      <div>
        <ProSpace className="top-action-container">
          {' '}
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
      </div>
      <ImportProjects visible={importModalVisible} setVisibility={setImportModalVisibility} />
      <ExportProjectsModal visible={exportModalVisible} setVisibility={setExportModalVisibility} />
    </ProGridContainer>
  );
};

export default ProjectList;
