import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';
import { message } from 'antd';
import { identifier } from '../manage/Client/service';

export async function createTeamMember(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/organisation-members', {
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

export async function getTeamMembers() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/organisation-members', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

export async function archiveTeamMembers(id: identifier, params: { archived: boolean }) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/organisation-members/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}
