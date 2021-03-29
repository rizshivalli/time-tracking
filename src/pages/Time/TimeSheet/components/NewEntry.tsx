import { ProModal } from '@/common';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';
import React, { FC } from 'react';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { format } from 'prettier';

interface NewEntryProps {
  selectedKey: string;
  visible: boolean;
  setVisibility: any;
}
const NewEntry: FC<NewEntryProps> = ({ selectedKey, visible, setVisibility }) => {
  return (
    <ProModal
      title={`New Time Entry for ${getRequiredDateFormat(selectedKey, 'dddd, DD MMM')}`}
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setVisibility(false)}
      width={540}
    >
      <ProForm>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          //   width="lg"
          name="project"
          label="Project/Client"
        />
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          //   width="lg"
          name="task"
          label="Task"
        />
        <ProForm.Group>
          <ProFormTextArea width="md" name="notes" label="Notes" />
          <ProFormTimePicker
            label="Select Time"
            name="time"
            fieldProps={{ format: 'HH:mm', showNow: false }}
          />
        </ProForm.Group>
      </ProForm>
    </ProModal>
  );
};

export default NewEntry;
