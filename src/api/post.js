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

export async function apiAppendPost(body) {
  try {
    const { data } = await postInstance.post("/", body);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiEditPost(body) {
  try {
    const { data } = await postInstance.patch("/", body);
    return data;
  } catch (error) {
    throw error;
  }
}