import { apiClient } from "../../../shared/api/apiClient";

export const login = (data) =>
   apiClient.post("/auth/login", data);
  


export const signup = (data) =>
  apiClient.post("/auth/signup", data);

export const googleLogin = (credential) =>
  apiClient.post("/auth/google", {
    credential,
  });

export const fetchCurrentUser = async () => {
    return await apiClient.get("/auth/profile");
};

export const changePasswd = async (email, password, newPassword) => {
    return await apiClient.post("/auth/change-password", {
        email,
        password,
        newPassword
    });
};