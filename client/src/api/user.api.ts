import { UserAPI } from './../config/api.config';
export const getUser = async (access_token: string) => {
  return await UserAPI.get('profile', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserPost = async (access_token: string) => {
  return await UserAPI.get('posts', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
