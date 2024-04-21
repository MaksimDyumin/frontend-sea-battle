import axios from 'axios';
import { baseUrl } from '@/config';

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000, // Установите тайм-аут для запросов (в миллисекундах)
    // Добавьте любые другие настройки Axios, если необходимо
  });

  return axiosInstance;
};

export default useAxios;