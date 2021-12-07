/* eslint-disable prettier/prettier */
import axios from "axios";

const postInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api/posts`,
  withCredentials: true,
  timeout: 1000,
});

export async function apiFetchPosts(offset) {
  try {
    const { data } = await postInstance.get(`?offset=${offset}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiFetchPost(body) {
  try {
    const { data } = await postInstance.get(`/${body.PostId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiAppendPost(formData) {
  try {
    const { data } = await postInstance.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiEditPost(formData) {
  try {
    const { data } = await postInstance.patch("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiDeletePost(body) {
  try {
    const { data } = await postInstance.delete(`/${body.PostId}`);
    return data;
  } catch (error) {
    throw error;
  }
}