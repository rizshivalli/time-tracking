import { ProModal, ProSpace } from '@/common';
import { InboxOutlined } from '@ant-design/icons';
import { message, Typography, Upload } from 'antd';
import React from 'react';
import type { FC } from 'react';
import { CSVLink } from 'react-csv';
import { getOrganization, getToken } from '@/utils/token';

const { Text, Link } = Typography;
const { Dragger } = Upload;
const token = getToken();
const organization = getOrganization();
interface ImportProjectModalProps {
  visible: boolean;
  setVisibility: any;
}

// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   onChange(info: any) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };
const csvData = [
  {
    Client: 'Vance Refrigeration',
    Project: 'Printer Paper Supply',
    'Project Code': 'PRNT-VANCE',
    'Start Date': '2015-01-01',
    'End Date': '2015-03-04',
    'Project Notes': 'Keeping their office machines stocked',
  },
  {
    Client: 'Vance Refrigeration',
    Project: 'High-Gloss Fliers',
    'Project Code': 'GLOSS-VANCE',
    'Start Date': '2015-01-01',
    'End Date': '',
    'Project Notes': 'Marketing material stock',
  },
  {
    Client: 'Michael Scott Paper Company',
    Project: 'Wholesale Deliveries',
    'Project Code': 'DLVR-MSPC',
    'Start Date': '',
    'End Date': '',
    'Project Notes': 'Internal warehouse shuffling',
  },
  {
    Client: 'Michael Scott Paper Company',
    Project: 'Tech Support',
    'Project Code': '',
    'Start Date': '',
    'End Date': '',
    'Project Notes': '',
  },
];

const ImportPeopleModal: FC<ImportProjectModalProps> = ({ visible, setVisibility }) => {
  const props = {
    name: 'files',
    action: '/strapi/projects/import',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Requested-With': null,
      orgid: organization,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <ProModal
      title="Import Projects"
      visible={visible}
      destroyOnClose
      onCancel={() => setVisibility(false)}
      okText="Upload and Import Projects"
    >
      <ProSpace direction="vertical">
        <Text>Create a CSV file with six columns in this order</Text>
        <Text strong={true}>
          Client, Project, Project Code, Start Date, End Date, Project Notes
        </Text>
        <div>
          <Text>
            All headers are required exactly as written, but only the first two columns need to be
            filled in to import successfully. You can{' '}
            <CSVLink filename={'projects.csv'} data={csvData}>
              download a sample CSV file here.
            </CSVLink>
            download a sample CSV file here.
          </Text>
        </div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or
            other band files
          </p>
        </Dragger>
      </ProSpace>
    </ProModal>
  );
};

export default ImportPeopleModal;
