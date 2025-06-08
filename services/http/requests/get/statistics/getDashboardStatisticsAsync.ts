import type {AxiosInstance} from 'axios';

const getDashboardStatisticsAsync = async (axios: AxiosInstance) => {
  return await axios.get('statistics/dashboard');
};

export default getDashboardStatisticsAsync;
