import { ProModal, ProSpace } from '@/common';
import React, { useState } from 'react';
import type { FC } from 'react';
import { message, Typography } from 'antd';
import ProjectButtonGroup from './ProjectButtonGroup';
import ExportTypeButtonGroup from './ExportTypeButtonGroup';
import { exportProjectCSV } from '../../service';
import { saveAs } from 'file-saver';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';

const { Text } = Typography;

const buttonGroupData = [
  { key: 0, value: 'Active', number: 5 },
  { key: 1, value: 'Archived', number: 2 },
];
const exportTypeGroupData = [
  { key: 0, value: 'CSV' },
  { key: 1, value: 'XLS' },
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

  const downloadProjectReport = async (params: any) => {
    const hide = message.loading('Please wait while we download your file..', 0);
    await exportProjectCSV({})
      .then((data) => {
        saveAs(
          data,
          `All Projects ${getRequiredDateFormat(
            new Date(),
            'MM-DD-YYYY HH-mm-ss',
          )}.${params.export_type.toLowerCase()}`,
        );
        message.success('Report File generated successfully');
        setVisibility(false);
      })
      .catch((error) => {
        message.error('Error occured while generating report');
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <ProModal
      title="Export Projects"
      visible={visible}
      onCancel={() => {
        setVisibility(false);
      }}
      onOk={async () => {
        const params = {
          project_type: selectedProjectTypeButton.value,
          export_type: selectedExportTypeButton.value,
        };
        await downloadProjectReport(params);
        console.log('🚀 ~ file: ExportProjectsModal.tsx ~ line 47 ~ params', params);
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
