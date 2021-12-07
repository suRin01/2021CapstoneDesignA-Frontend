import axios from "axios";

const userInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api/user`,
  withCredentials: true,
  timeout: 1000,
});

export async function apiRegister(formData) {
  try {
    const { data } = await userInstance.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function apiLoadToMe() {
  try {
    const { data } = await userInstance.get("/me");
    return data;
  } catch (error) {
    throw error;
  }
}
