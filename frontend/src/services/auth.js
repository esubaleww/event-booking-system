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
export const promoteUser = async (userId) => {
  const response = await API.put(`/auth/promote/${userId}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get("/auth/users");
  return response.data;
};
