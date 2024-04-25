import { baseUrl } from '@/config';

import useCookie from './useCookie'
import axios from 'axios';

function useApi() {
  const defaultUrl = process.env.NODE_ENV === 'production'
  ? 'https://example.com/'
  : baseUrl;
  const accessToken = useCookie('accessToken')
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken.value}`
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const accessToken = useCookie('accessToken')
      if (accessToken.value) {
        config.headers['Authorization'] = `Bearer ${accessToken.value}`
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },

    async function (error) {
      const config = error?.config
      const refreshToken = useCookie('refreshToken')
      const accessToken = useCookie('accessToken')

      if (error?.response?.statusText === 'Unauthorized' && !config._retry && refreshToken.value) {
        config._retry = true;
        const response = await axios.post(defaultUrl + 'api/v1/token/refresh/', { refresh: refreshToken.value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          })


        if (response?.statusText === 'OK') {
          accessToken.value = response.data.access
          refreshToken.value = response.data.refresh

          config.headers['Authorization'] = `Bearer ${response.data.access}`
          return api(config);
        }

      }
      return Promise.reject(error);
    });

  let publicClient = axios.create({
    baseURL: defaultUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return {
    api: api,
    publicClient: publicClient,
  };
}

export default useApi;