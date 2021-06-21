import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';
import { message } from 'antd';

type identifier = string | number | undefined;

export async function getTeamMates() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/organisation-members`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  try {
    return response.data;
  } catch (err) {
    throw new Error(response.message);
  }
}

export async function createProject(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/projects', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getProjects(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/projects', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    params,
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error('Error occured, Please try again');
    return [];
  }
}

export async function getProjectsCount() {
  const token = await getToken();
  const organization = await getOrganization();
  return request('/strapi/projects/count', {
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
}

export async function getProjectsById(id: identifier) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/projects/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getProjectSummaryById(id: identifier) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/projects/summary/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function editProjectsById(id: identifier, params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/projects/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function importProjectCSV(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  return request('/strapi/projects/import', {
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    method: 'POST',
    data: { ...params },
  });
}

export async function archiveProject(id: identifier, params: { archived: boolean }) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/projects/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });

  if (response.statusCode === 200) {
    message.success('Team member archived successfully');
    return response.data;
  } else {
    message.error('Error occured while deleting, Please try again');

    return [];
  }
}
