import { ProGridContainer, ProSpace } from '@/common';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'umi';
import { ImportPeopleModal } from './Components';
import './index.less';

const TeamList = () => {
  return (
    <ProGridContainer>
      <div>
        <ProSpace className="top-action-container-team">
          <Link to="/people/new">
            <Button icon={<PlusOutlined />}>Add Person</Button>
          </Link>
          <Button>Imports</Button>
          <Button>Export</Button>
        </ProSpace>
      </div>
      <ImportPeopleModal />
    </ProGridContainer>
  );
};

export default TeamList;
