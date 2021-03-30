import { ProGridContainer, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

const ProjectList = () => {
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
          <Button className="left-button">Import</Button>
          <Button className="left-button">Export</Button>
        </ProSpace>
      </div>
    </ProGridContainer>
  );
};

export default ProjectList;
