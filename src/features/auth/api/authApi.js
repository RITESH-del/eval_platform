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