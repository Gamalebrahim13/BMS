import axiosClient from "../module/axiosClient";


// Login
export const login = (data: { email: string; password: string }) => {
  return axiosClient.post("/Users/Login", data).then((res) => res.data);
};

// Register (FormData because of file upload)
export const register = (data: any) => {
  const formData = new FormData();

  formData.append("userName", data.userName);
  formData.append("email", data.email);
  formData.append("country", data.country);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("password", data.password);
  formData.append("confirmPassword", data.confirmPassword);

  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  return axiosClient.post("/Users/Register", formData).then((res) => res.data);
};

// Verify account
export const verifyAccount = (data: { email: string; code: string }) => {
  return axiosClient.put("/Users/verify", data).then((res) => res.data);
};

// Change password (logged in user)
export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  return axiosClient
    .put("/Users/ChangePassword", data)
    .then((res) => res.data);
};

// Request reset password (forgot password)
export const requestResetPassword = (data: { email: string }) => {
  return axiosClient
    .post("/Users/Reset/Request", data)
    .then((res) => res.data);
};

// Reset password (final step)
export const resetPassword = (data: {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}) => {
  return axiosClient.post("/Users/Reset", data).then((res) => res.data);
};