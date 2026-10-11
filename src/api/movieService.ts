import axiosInstance from './axiosInstance';
import type { Movie, MovieRequest, MessageResponse } from '../types';


export const movieService = {
  getAllMovies: async (): Promise<Movie[]> => {
    const response = await axiosInstance.get<Movie[]>('/movies');
    return response.data;
  },

  getMovieById: async (id: number): Promise<Movie> => {
    const response = await axiosInstance.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  createMovie: async (data: MovieRequest): Promise<Movie> => {
    const response = await axiosInstance.post<Movie>('/movies', data);
    return response.data;
  },

  updateMovie: async (id: number, data: MovieRequest): Promise<Movie> => {
    const response = await axiosInstance.put<Movie>(`/movies/${id}`, data);
    return response.data;
  },

  deleteMovie: async (id: number): Promise<MessageResponse> => {
    const response = await axiosInstance.delete<MessageResponse>(`/movies/${id}`);
    return response.data;
  },
};
