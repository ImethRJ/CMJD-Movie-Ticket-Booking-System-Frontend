import axiosInstance from './axiosInstance';
import type { Booking, BookingRequest } from '../types';


export const bookingService = {
  createBooking: async (data: BookingRequest): Promise<Booking> => {
    const response = await axiosInstance.post<Booking>('/bookings', data);
    return response.data;
  },

  getBookingById: async (id: number): Promise<Booking> => {
    const response = await axiosInstance.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  getMyBookings: async (): Promise<Booking[]> => {
    const response = await axiosInstance.get<Booking[]>('/bookings/my-bookings');
    return response.data;
  },

  getAllBookings: async (): Promise<Booking[]> => {
    const response = await axiosInstance.get<Booking[]>('/bookings');
    return response.data;
  },

  cancelBooking: async (id: number): Promise<Booking> => {
    const response = await axiosInstance.put<Booking>(`/bookings/${id}/cancel`);
    return response.data;
  },

  deleteBooking: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/bookings/${id}`);
  },
};
