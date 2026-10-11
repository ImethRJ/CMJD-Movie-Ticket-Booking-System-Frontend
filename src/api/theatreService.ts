import axiosInstance from './axiosInstance';
import type { Theatre, TheatreRequest, MessageResponse } from '../types';


export const theatreService = {
  getAllTheatres: async (): Promise<Theatre[]> => {
    const response = await axiosInstance.get<Theatre[]>('/theatres');
    return response.data;
  },

  getTheatreById: async (id: number): Promise<Theatre> => {
    const response = await axiosInstance.get<Theatre>(`/theatres/${id}`);
    return response.data;
  },

  createTheatre: async (data: TheatreRequest): Promise<Theatre> => {
    const response = await axiosInstance.post<Theatre>('/theatres', data);
    return response.data;
  },

  updateTheatre: async (id: number, data: TheatreRequest): Promise<Theatre> => {
    const response = await axiosInstance.put<Theatre>(`/theatres/${id}`, data);
    return response.data;
  },

  deleteTheatre: async (id: number): Promise<MessageResponse> => {
    const response = await axiosInstance.delete<MessageResponse>(`/theatres/${id}`);
    return response.data;
  },
};
