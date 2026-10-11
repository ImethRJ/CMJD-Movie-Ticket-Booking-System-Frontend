import axiosInstance from './axiosInstance';
import type { Show, ShowRequest, ShowSeatAvailabilityResponse, MessageResponse } from '../types';


export const showService = {
  getAllShows: async (): Promise<Show[]> => {
    const response = await axiosInstance.get<Show[]>('/shows');
    return response.data;
  },

  getShowById: async (id: number): Promise<Show> => {
    const response = await axiosInstance.get<Show>(`/shows/${id}`);
    return response.data;
  },

  getShowsByMovieId: async (movieId: number): Promise<Show[]> => {
    const response = await axiosInstance.get<Show[]>(`/shows/movie/${movieId}`);
    return response.data;
  },

  getShowSeatAvailability: async (id: number): Promise<ShowSeatAvailabilityResponse> => {
    const response = await axiosInstance.get<ShowSeatAvailabilityResponse>(`/shows/${id}/available-seats`);
    return response.data;
  },

  createShow: async (data: ShowRequest): Promise<Show> => {
    const response = await axiosInstance.post<Show>('/shows', data);
    return response.data;
  },

  updateShow: async (id: number, data: ShowRequest): Promise<Show> => {
    const response = await axiosInstance.put<Show>(`/shows/${id}`, data);
    return response.data;
  },

  deleteShow: async (id: number): Promise<MessageResponse> => {
    const response = await axiosInstance.delete<MessageResponse>(`/shows/${id}`);
    return response.data;
  },
};
