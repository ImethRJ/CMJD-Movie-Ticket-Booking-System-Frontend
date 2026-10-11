import axiosInstance from './axiosInstance';
import type { JwtResponse, SignInRequest, SignUpRequest, UserResponse } from '../types';


export const authService = {
  signUp: async (data: SignUpRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post<UserResponse>('/auth/signup', data);
    return response.data;
  },

  signIn: async (data: SignInRequest): Promise<JwtResponse> => {
    const response = await axiosInstance.post<JwtResponse>('/auth/signin', data);
    return response.data;
  },
};
