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

export async function getTeamMembers(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  // const newParams = { is_archived_ne: true, ...params };
  const response = await request('/strapi/organisation-members', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    params,
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

export async function archiveTeamMembers(id: identifier, params: { is_archived: boolean }) {
  const token = await getToken();
  const organization = await getOrganization();
  await request(`/strapi/organisation-members/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  })
    .then((response) => {
      if (response && response.statusCode === 200) {
        message.success('Team Member archived successfully');
        return response.data;
      } else {
        message.error('Error occured while archiving, Please try again');
        return [];
      }
    })
    .catch((error) => {
      {
        throw new Error(error.message);
      }
    });
}

export async function exportTeamCSV(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  return request('/strapi/organisation-members/export', {
    responseType: 'blob',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    method: 'GET',
    params,
    // data: { ...params },
  });
}

export async function getMembersSummarry(id: identifier, params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  // const newParams = { is_archived_ne: true, ...params };
  const response = await request(`/strapi/organisation-members/summary/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    params,
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}
