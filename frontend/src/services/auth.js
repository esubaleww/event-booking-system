import API, { setAuthToken } from "./api";

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  setAuthToken(res.data.token);
  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  setAuthToken(res.data.token);
  return res.data;
};
