import axiosInstance from './axiosInstance';
import type { Payment, PaymentRequest, PaymentStatus } from '../types';


export const paymentService = {
  processPayment: async (data: PaymentRequest): Promise<Payment> => {
    const response = await axiosInstance.post<Payment>('/payments/process', data);
    return response.data;
  },

  getPaymentById: async (id: number): Promise<Payment> => {
    const response = await axiosInstance.get<Payment>(`/payments/${id}`);
    return response.data;
  },

  getPaymentByBookingId: async (bookingId: number): Promise<Payment> => {
    const response = await axiosInstance.get<Payment>(`/payments/booking/${bookingId}`);
    return response.data;
  },

  getPaymentStatus: async (id: number): Promise<PaymentStatus> => {
    const response = await axiosInstance.get<PaymentStatus>(`/payments/${id}/status`);
    return response.data;
  },
};
