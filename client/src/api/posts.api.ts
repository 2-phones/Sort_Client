import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PostsAPI } from '../config/api.config';

export const createPost = async (data: any) => {
  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    return;
  }

  return await PostsAPI.post('posts', data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const editPost = async (data: any, post_id: string | undefined) => {
  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    return;
  }

  return await PostsAPI.put(`posts/${post_id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const deletePost = async (post_id: string) => {
  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    return;
  }

  return await PostsAPI.delete(`posts/${post_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPosts = async (api: string) => {
  try {
    const result = await PostsAPI.get(api);
    return result['data'];
  } catch {
    return null;
  }
};

export const getPostId = async (api: string) => {
  try {
    const result = await PostsAPI.get(api);
    return result['data'];
  } catch {}
};
