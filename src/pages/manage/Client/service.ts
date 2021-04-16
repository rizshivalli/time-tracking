import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';

export type identifier = string | number | undefined;

export async function createClient(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/clients', {
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

export async function getClients() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/clients`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function deleteClient(client_id: identifier) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/clients/${client_id}`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

// get client by id
export async function getClientById(id: identifier) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/clients/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

// get client by id
export async function editClientById(id: identifier, params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/clients${id}`, {
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
