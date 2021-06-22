import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';
import { message } from 'antd';
import { identifier } from '@/pages/manage/Client/service';

export async function getInitialReport(startDate: string, endDate: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/time-records/reports?start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

export async function getClientsReportById(id: identifier, startDate: string, endDate: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/clients/reports/${id}/?start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

export async function getProjectsReportById(id: identifier, startDate: string, endDate: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/projects/reports/${id}/?start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

export async function getTasksReportById(id: identifier, startDate: string, endDate: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/tasks/reports/${id}/?start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

export async function getTeamsReportById(id: identifier, startDate: string, endDate: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/organisation-members/reports/${id}/?start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}
