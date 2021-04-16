import { getRequiredDateFormat } from '@/utils/MomentHelpers';
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

export async function createTimeRecord(params: any) {
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

export async function getTasks(project_id: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/tasks?projects=${project_id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    // data: { client: client_id },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getProjectsForTask() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/projects', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function createNewTimeRecord(params: any) {
  const hide = message.loading('Starting Timer...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/time-records', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });
  if (response.statusCode === 200) {
    hide();
    message.success('Timer Started');
    return response.data;
  } else {
    hide();
    message.error(response.message);
    throw new Error(response.message);
  }
}

export async function stopTimeRecord(id: identifier, params: any) {
  const hide = message.loading('Stopping Timer...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/time-records/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });
  if (response.statusCode === 200) {
    hide();
    message.success('Timer Stopped');
    return response.data;
  } else {
    hide();
    message.error(response.message);
    throw new Error(response.message);
  }
}

export async function getTimeRecords(dates: { start_date: string; end_date: string }) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/time-records?date_gte=${dates.start_date}&date_lte=${dates.end_date}`,
    {
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getWeekTimeRecords(start_date: string, end_date: string) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/time-records/week?start_date=${getRequiredDateFormat(
      start_date,
      'YYYY-MM-DD',
    )}&end_date=${getRequiredDateFormat(end_date, 'YYYY-MM-DD')}`,
    {
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function updateWeekRecords(params: any) {
  const hide = message.loading('updating records...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/time-records/week-entry`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });
  if (response.statusCode === 200) {
    hide();
    message.success('Records Updated');
    return response.statusCode;
  } else {
    hide();
    message.error(response.message);
    throw new Error(response.message);
  }
}
// time - records / add - week - row;

export async function addWeekRows(params: any) {
  const hide = message.loading('adding records...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/time-records/add-week-row`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });
  if (response.statusCode === 200) {
    hide();
    message.success('Records Updated');
    return response.statusCode;
  } else {
    hide();
    message.error(response.message);
    throw new Error(response.message);
  }
}

export async function submitWeekForApproval(params: { start_date: string; end_date: string }) {
  const hide = message.loading('Submitting week for approval...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/approvals/submit-for-approval?start_date=${params.start_date}&end_date=${params.end_date}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );
  if (response.statusCode === 200) {
    hide();
    message.success('Submitted for approval');
    return response.data;
  } else {
    hide();
    message.error(response.message);
    throw new Error(response.message);
  }
}

// get list of pending Approvals
export async function getPendingApprovals() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/approvals/pending', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

// get list of pending Approvals for user
export async function getPendingApprovalByID(id: identifier) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/approvals/pending/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}