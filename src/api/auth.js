import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api/auth`,
  withCredentials: true,
  timeout: 1000,
});

export async function apiLogin(body) {
  try {
    const { data } = await authInstance.post("/", body);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiLogout() {
  try {
    const { data } = await authInstance.delete("/logout");
    return data;
  } catch (error) {
    throw error;
  }
}
