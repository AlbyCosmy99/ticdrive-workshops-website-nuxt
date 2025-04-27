const useUserData = async () => {
  const $ticDriveAxios = useTicDriveAxios();
  const response = await $ticDriveAxios.get('auth/get-user-data');
  return response?.data;
};

export default useUserData;
