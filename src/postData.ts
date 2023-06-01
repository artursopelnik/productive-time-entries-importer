import { TypedProcess } from './env';
import axios, { AxiosInstance } from 'axios';
import getTimeInSeconds from './getTimeInSeconds';

const {
  PRODUCTIVE_API_TOKEN: token,
  PRODUCTIVE_ORGANISATION_ID: organizationId,
  PRODUCTIVE_USER_ID: personId,
  PRODUCTIVE_SERVICE_ID: serviceId
} = (process as TypedProcess).env;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.productive.io/api/v2',
  timeout: 5000,
  headers: {
    'X-Auth-Token': `${token}`,
    'X-Organization-Id': `${organizationId}`,
    'Content-Type': 'application/vnd.api+json',
    Accept:
      'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'
  }
});

const createData = (date: string, time: string, note: string | undefined) => {
  return {
    data: {
      type: 'time_entries',
      attributes: {
        date,
        ...(note ? { note } : {}),
        time: getTimeInSeconds(time)
      },
      relationships: {
        person: {
          data: {
            type: 'people',
            id: personId
          }
        },
        service: {
          data: {
            type: 'services',
            id: serviceId
          }
        }
      }
    }
  };
};

export default async (date: string, time: string, note: string | undefined) => {
  const data = createData(date, time, note);

  try {
    const {
      data: {
        data: { id: timeEntryId }
      }
    } = await axiosInstance.post('/time_entries', data);
    console.log(`time-entry is created with id: ${timeEntryId}`);
  } catch (err: unknown) {
    console.log(err);
  }
};
