import { ProModal, ProSpace } from '@/common';
import React, { useState } from 'react';
import type { FC } from 'react';
import { message, Typography } from 'antd';
import ExportTypeButtonGroup from './ExportTypeButtonGroup';
import { exportProjectCSV } from '../../service';
import { saveAs } from 'file-saver';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';

const { Text } = Typography;

const exportTypeGroupData = [
  { key: 1, value: 'CSV', isDisabled: false },
  { key: 0, value: 'XLS', isDisabled: true },
];

interface ExportProjectModalProps {
  visible: boolean;
  setVisibility: any;
  existingParams: any;
}

const ExportProjects: FC<ExportProjectModalProps> = ({
  visible,
  setVisibility,
  existingParams,
}) => {
  const [selectedExportTypeButton, setSelectedExportTypeButton] = useState(exportTypeGroupData[1]);

  const buttonExportGroupCallBack = (dataFromChild: any) => {
    setSelectedExportTypeButton(dataFromChild);
  };

  const downloadProjectReport = async (params: any) => {
    const hide = message.loading('Please wait while we download your file..', 0);
    await exportProjectCSV(params)
      .then((data) => {
        saveAs(
          data,
          `All Projects ${getRequiredDateFormat(new Date(), 'MM-DD-YYYY HH-mm-ss')}.csv`,
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
        await downloadProjectReport(existingParams);
      }}
    >
      <ProSpace direction="vertical">
        <ProSpace direction="vertical"></ProSpace>
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
