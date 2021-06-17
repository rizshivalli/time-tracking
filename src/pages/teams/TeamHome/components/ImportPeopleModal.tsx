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
    'First Name': 'Michael',
    'Last Name': 'Scott',
    Email: 'michael@dundermifflin.net',
    Roles: 'Founder|CEO|Management',
    'Billable Rate': null,
    'Cost Rate': 50.25,
    Admin: 'yes',
    Employee: 'yes',
    Capacity: 35,
  },
  {
    'First Name': 'Dwight',
    'Last Name': 'Schrute',
    Email: 'dwight@dundermifflin.net',
    Roles: 'Sales',
    'Billable Rate': null,
    'Cost Rate': 30,
    Admin: '',
    Employee: 'no',
    Capacity: 40,
  },
  {
    'First Name': 'Andy',
    'Last Name': 'Bernard',
    Email: 'andy@dundermifflin.net',
    Roles: 'Sales',
    'Billable Rate': 100,
    'Cost Rate': 30,
    Admin: '',
    Employee: 'yes',
    Capacity: 37.5,
  },
  {
    'First Name': 'Toby',
    'Last Name': 'Flenderson',
    Email: 'toby@dundermifflin.net',
    Roles: 'Human Resources',
    'Billable Rate': 120,
    'Cost Rate': null,
    Admin: 'yes',
    Employee: 'yes',
    Capacity: null,
  },
  {
    'First Name': 'Ryan',
    'Last Name': 'Howard',
    Email: 'ryan@dundermifflin.net',
    Roles: 'Temp',
    'Billable Rate': 25,
    'Cost Rate': null,
    Admin: '',
    Employee: 'no',
    Capacity: null,
  },
];

const ImportPeopleModal: FC<ImportProjectModalProps> = ({ visible, setVisibility }) => {
  const props = {
    name: 'files',
    action: '/strapi/organisation-members/import',
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
      title="Import People"
      visible={visible}
      destroyOnClose
      onCancel={() => setVisibility(false)}
      okText="Upload and Import People"
    >
      <ProSpace direction="vertical">
        <Text>Create a CSV file with nine columns in this order:</Text>
        <Text strong={true}>
          First Name, Last Name, Email, Roles, Billable Rate, Cost Rate, Admin, Employee, Capacity
        </Text>
        <div>
          <ul>
            <li>The first three columns are required</li>
            <li>Separate unique roles with the | symbol.</li>
            <li>
              Don’t enter currency symbols for rates. We’ll use your account’s default currency.
            </li>
            <li>
              In the Admin and Employee columns, write “yes” or leave blank to import the person as
              a Regular User or contractor, respectively.
            </li>
            <li>
              Importing existing teammates will replace any existing rates, roles, capacity, and
              permissions or employee/contractor status.
            </li>
          </ul>
          <Text>
            Don’t forget to include the header row spelled exactly as you see above! Here is{' '}
            <CSVLink filename={'people_sample.csv'} data={csvData}>
              a sample CSV.
            </CSVLink>
          </Text>
        </div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </ProSpace>
    </ProModal>
  );
};

export default ImportPeopleModal;
