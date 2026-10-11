import axiosInstance from './axiosInstance';
import type { User, MessageResponse, UserUpdateRequest, SignUpRequest } from '../types';


export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>('/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (data: SignUpRequest): Promise<MessageResponse> => {
    const response = await axiosInstance.post<MessageResponse>('/auth/register', data);
    return response.data;
  },

  updateUser: async (id: number, data: UserUpdateRequest): Promise<User> => {
    const response = await axiosInstance.put<User>(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<MessageResponse> => {
    const response = await axiosInstance.delete<MessageResponse>(`/users/${id}`);
    return response.data;
  },
};

