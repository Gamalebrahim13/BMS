import axiosClient from "../axiosClient";

// Types

interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: File;
}

export interface VerifyData {
  email: string;
  code: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface RequestResetPasswordData {
  email: string;
}

interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}


// Login

export const login = async (data: LoginData) => {
  const response = await axiosClient.post(
    "/Users/Login",
    data
  );

  return response.data;
};

// Register

export const registerUser = async (data: RegisterData) => {
  const formData = new FormData();

 formData.append("userName", data.userName.trim());
  formData.append("email", data.email.trim());
  formData.append("country", data.country.trim());
  formData.append("phoneNumber", String(data.phoneNumber).trim());
  if (data.password) {
    formData.append("password", data.password.trim());
  }
  if (data.confirmPassword) {
    formData.append("confirmPassword", data.confirmPassword.trim());
  }
 if (data.profileImage) {
    if (data.profileImage instanceof FileList && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    } else if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }
  }
  const response = await axiosClient.post(
    "/Users/Register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    }
  );

  return response;
};

// Verify Account

export const verifyAccount = async (
  data: VerifyData
) => {
  const response = await axiosClient.put(
    "/Users/verify",
    data
  );

  return response.data;
};

// Change Password

export const changePassword = async (
  data: ChangePasswordData
) => {
  const response = await axiosClient.put(
    "/Users/ChangePassword",
    data
  );

  return response.data;
};

// Request Reset Password

export const requestResetPassword = async (
  data: RequestResetPasswordData
) => {
  const response = await axiosClient.post(
    "/Users/Reset/Request",
    data
  );

  return response.data;
};

// Reset Password

export const resetPassword = async (
  data: ResetPasswordData
) => {
  const response = await axiosClient.post(
    "/Users/Reset",
    data
  );

  return response.data;
};