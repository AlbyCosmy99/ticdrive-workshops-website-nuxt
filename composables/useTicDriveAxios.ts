import type {AxiosInstance} from 'axios';

const useTicDriveAxios = (): AxiosInstance => {
  const {$ticDriveAxios} = useNuxtApp();
  return $ticDriveAxios as AxiosInstance;
};

export default useTicDriveAxios;
