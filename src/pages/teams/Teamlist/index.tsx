import { ProGridContainer, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'umi';
import './index.less';

const TeamList = () => {
  return (
    <ProGridContainer>
      <div>
        <ProSpace className="top-action-container-team">
          {' '}
          <Link to="/people/new">
            <Button icon={<PlusOutlined />}>Add Person</Button>
          </Link>
          <Button>Import</Button>
          <Button>Export</Button>
        </ProSpace>
      </div>
    </ProGridContainer>
  );
};

export default TeamList;
