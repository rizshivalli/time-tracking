import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';
import { message } from 'antd';
// import { identifier } from '../manage/Client/service';

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
