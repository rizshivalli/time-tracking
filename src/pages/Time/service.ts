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
  const response = await request('/strapi/clients', {
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
    message.error(`${response.message}, Please try Again`);
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
    message.error(`${response.message}, Please try Again`);
    throw new Error(response.message);
  }
}

export async function getTimeRecords(dates: { start_date: string; end_date: string }, params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/time-records?date_gte=${dates.start_date}&date_lte=${dates.end_date}`,
    {
      params,
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
    },
  );
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getWeekTimeRecords(start_date: string, end_date: string, params: any) {
  console.log('🚀 ~ file: service.ts ~ line 127 ~ getWeekTimeRecords ~ params', params);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(
    `/strapi/time-records/week?start_date=${getRequiredDateFormat(
      start_date,
      'YYYY-MM-DD',
    )}&end_date=${getRequiredDateFormat(end_date, 'YYYY-MM-DD')}`,
    {
      headers: { Authorization: `Bearer ${token}`, orgid: organization },
      params,
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
    message.error(`${response.message}, Please try Again`);
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
    message.error(`${response.message}, Please try Again`);
    throw new Error(response.message);
  }
}

export async function submitWeekForApproval(id: identifier) {
  const hide = message.loading('Submitting week for approval...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/approvals/submit-for-approval?id=${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    hide();
    message.success('Submitted for approval');
    return response.data;
  } else {
    hide();
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}

// get list of pending Approvals
export async function getPendingApprovals() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/approvals/type/pending', {
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

export async function approveTimesheet(id: identifier) {
  const hide = message.loading('Approving Timesheet...', 0);
  const token = await getToken();
  const organization = await getOrganization();
  await request(`/strapi/approvals/approve/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  })
    .then((response) => {
      if (response.statusCode === 200) {
        hide();
        message.success('Timesheet has been successfully approved');
        return response.data;
      } else {
        hide();
        message.error(`${response.message}, Please try Again`);
      }
    })
    .catch((error) => {
      hide();
      message.error(`${error.message}, Please try Again`);
    });
}

export async function addMultipleTeamMembers(params: any[]) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/organisation-members/many', {
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

export async function getArchivedApprovals() {
  const token = await getToken();
  const organization = await getOrganization();
  const params = { is_archived: true };
  const response = await request('/strapi/approvals/type/archived', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: { params },
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getUnsubmittedTimesheets() {
  const token = await getToken();
  const organization = await getOrganization();
  const params = { is_archived: true };
  const response = await request('/strapi/approvals/type/unsubmitted', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: { params },
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function getRandomQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const { statusCode, statusMessage, ...data } = await response.json();
  if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
  return data;
}

export async function getTeamMembers() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/organisation-members', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });

  if (response.statusCode === 200) {
    const newData = response.data.map((resp: any) => ({
      label: resp.full_name,
      value: resp.id,
    }));

    return newData;
  } else {
    message.error(`${response.message}, Please try Again`);
    return [];
  }
}
