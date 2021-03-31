import { ProSpace } from '@/common';
import { Button } from 'antd';
import React, { useState } from 'react';
import './index.less';
import type { FC } from 'react';

interface ButtonGroupProps {
  data: any[];
  parentCallback: any;
  selectedKey: string | number;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ data, parentCallback, selectedKey }) => {
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
            key={index.toString()}
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

export default ButtonGroup;
