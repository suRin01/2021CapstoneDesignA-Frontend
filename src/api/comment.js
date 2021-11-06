/* eslint-disable prettier/prettier */
import axios from "axios";

const commentInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api`,
  withCredentials: true,
  timeout: 1000,
});

export async function apiFetchComments(PostId) {
  try {
    const { data } = await commentInstance.get(`/comments/${PostId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiAppendComment(body) {
  try {
    const { data } = await commentInstance.post("/comment", body);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiRemoveComment(CommentId) {
  try {
    const { data } = await commentInstance.delete(`/comment/${CommentId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
