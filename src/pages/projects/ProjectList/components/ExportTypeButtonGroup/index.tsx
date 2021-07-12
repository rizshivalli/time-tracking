import { ProSpace } from '@/common';
import { FileExcelFilled, FileTextFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import type { FC } from 'react';

interface ButtonGroupProps {
  data: any[];
  parentCallback: any;
  selectedKey: string | number;
}

const ExportTypeButtonGroup: FC<ButtonGroupProps> = ({ data, parentCallback, selectedKey }) => {
  const [selectedButton, setSelectedButton] = useState(data[selectedKey].key);

  const sendDataToParent = (resp: any) => {
    parentCallback(resp);
  };
  return (
    <ProSpace>
      {data.map((item, index) => {
        const isSelected = item.key === selectedButton;
        return (
          <Button
            disabled={item.isDisabled}
            key={index.toString()}
            block
            size="large"
            icon={item.value === 'CSV' ? <FileTextFilled /> : <FileExcelFilled />}
            type={isSelected ? 'primary' : 'dashed'}
            onClick={() => {
              setSelectedButton(item.key);
              sendDataToParent(item);
            }}
          >
            {item.value}
          </Button>
        );
      })}
    </ProSpace>
  );
};

export default ExportTypeButtonGroup;
