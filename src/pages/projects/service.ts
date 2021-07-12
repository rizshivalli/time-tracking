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
  // const newParams = { is_archived_ne: true, ...params };
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

export async function archiveProject(id: identifier, params: { is_archived: boolean }) {
  const token = await getToken();
  const organization = await getOrganization();
  await request(`/strapi/projects/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  })
    .then((response) => {
      if (response && response.statusCode === 200) {
        message.success('Project archived successfully');
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

export async function exportProjectCSV(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  return request('/strapi/projects/export', {
    responseType: 'blob',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    method: 'GET',
    params,
    // data: { ...params },
  });
}

// projects / exports;

export async function getClients() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/clients', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  if (response.statusCode === 200) {
    const newData = response.data.map((resp: any) => ({
      label: resp.name,
      value: resp.name,
    }));

    return newData;
  } else {
    return [];
  }
}
