import axios from "axios";

const likeInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api/like`,
  withCredentials: true,
  timeout: 1000,
});

export async function apiLike(body) {
  try {
    const { data } = await likeInstance.post(`/${body.PostId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiUnlike(body) {
  try {
    const { data } = await likeInstance.delete(`/${body.PostId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
