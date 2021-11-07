/* eslint-disable prettier/prettier */
import axios from "axios";

const postInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api`,
  withCredentials: true,
  timeout: 1000,
});

export async function apiFetchPosts(lastId) {
  try {
    const { data } = await postInstance.get(`/posts/${lastId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiAppendPost(body) {
  try {
    const { data } = await postInstance.post("/post", body);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiEditPost(body) {
  try {
    const { data } = await postInstance.patch("/post", body);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiFetchPost(PostId) {
  try {
    const { data } = await postInstance.get(`/post/${PostId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
