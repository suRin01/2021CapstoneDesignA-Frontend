import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api/auth`,
  withCredentials: true,
  timeout: 1000,
});

const myRequestInterceptor = authInstance.interceptors.request.use(
  config => {
    // console.log("axios요청 보내기전 호출... 여기서 토큰전달할것같아서 일단 넣음");
    return config;
  },
  error => {
    console.log("오류 요청을 보내기전 호출됨");
    return Promise.reject(error);
  },
);

export async function apiRegister(formData) {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/auth`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiLogin(body) {
  try {
    const { data } = await authInstance.post("/login", body);
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

export async function apiLoadToMe() {
  try {
    const { data } = await authInstance.get("/me");
    return data;
  } catch (error) {
    throw error;
  }
}
