import { ProModal, ProSpace } from '@/common';
import React, { useState } from 'react';
import type { FC } from 'react';
import { Typography } from 'antd';
import ProjectButtonGroup from './ProjectButtonGroup';
import ExportTypeButtonGroup from './ExportTypeButtonGroup';

const { Text } = Typography;

const buttonGroupData = [
  { key: 0, value: 'Active', number: 5 },
  { key: 1, value: 'Archived', number: 2 },
];
const exportTypeGroupData = [
  { key: 0, value: 'CSV' },
  { key: 1, value: 'EXCEL' },
];

interface ExportProjectModalProps {
  visible: boolean;
  setVisibility: any;
}

const ExportProjects: FC<ExportProjectModalProps> = ({ visible, setVisibility }) => {
  const [selectedProjectTypeButton, setSelectedProjectTypeButton] = useState(buttonGroupData[0]);
  const [selectedExportTypeButton, setSelectedExportTypeButton] = useState(exportTypeGroupData[1]);

  const buttonGroupCallBack = (dataFromChild: any) => {
    setSelectedProjectTypeButton(dataFromChild);
  };
  const buttonExportGroupCallBack = (dataFromChild: any) => {
    setSelectedExportTypeButton(dataFromChild);
  };

  return (
    <ProModal
      title="Export Projects"
      visible={visible}
      onCancel={() => {
        setVisibility(false);
      }}
    >
      <ProSpace direction="vertical">
        <ProSpace direction="vertical">
          {' '}
          <Text>Which projects would you like to export?</Text>
          <ProjectButtonGroup
            parentCallback={buttonGroupCallBack}
            data={buttonGroupData}
            selectedKey={selectedProjectTypeButton.key}
          />
        </ProSpace>
        <ProSpace direction="vertical">
          <Text>Which projects would you like to export?</Text>
          <ExportTypeButtonGroup
            data={exportTypeGroupData}
            parentCallback={buttonExportGroupCallBack}
            selectedKey={selectedExportTypeButton.key}
          />
        </ProSpace>
      </ProSpace>
    </ProModal>
  );
};

export default ExportProjects;
