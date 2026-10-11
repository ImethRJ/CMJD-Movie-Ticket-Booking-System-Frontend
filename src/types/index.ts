export type Role = 'ADMIN' | 'CUSTOMER';
export type MovieStatus = 'UPCOMING' | 'NOW_SHOWING' | 'ENDED';
export type TheatreStatus = 'ACTIVE' | 'INACTIVE';
export type ShowStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'CASH' | 'ONLINE';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: Role;
}

export type UserResponse = User;

export interface UserUpdateRequest {
  name: string;
  email: string;
  password?: string;
}


export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  name: string;
  role: Role;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  language: string;
  genre: string;
  releaseDate: string;
  status: MovieStatus;
  posterUrl?: string;
}

export interface Theatre {
  id: number;
  name: string;
  location: string;
  capacity: number;
  status: TheatreStatus;
}

export interface Show {
  id: number;
  movie: Movie;
  theatre: Theatre;
  showDate: string;
  showTime: string;
  ticketPrice: number;
  status: ShowStatus;
}

export interface Booking {
  id: number;
  user: User;
  show: Show;
  seatNumbers: string[];
  numberOfTickets: number;
  totalAmount: number;
  bookingDate: string;
  status: BookingStatus;
  paymentId: number | null;
  paymentStatus: PaymentStatus | null;
}

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  movieTitle: string;
  theatreName: string;
  seatNumbers: string[];
}

export interface ShowSeatAvailabilityResponse {
  showId: number;
  movieTitle: string;
  theatreName: string;
  showDate: string;
  showTime: string;
  totalCapacity: number;
  bookedSeats: string[];
  availableSeatsCount: number;
  ticketPrice: number;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  role?: Role;
}

export interface MovieRequest {
  title: string;
  description: string;
  duration: number;
  language: string;
  genre: string;
  releaseDate: string;
  status: MovieStatus;
  posterUrl?: string;
}

export interface TheatreRequest {
  name: string;
  location: string;
  capacity: number;
  status: TheatreStatus;
}

export interface ShowRequest {
  movieId: number;
  theatreId: number;
  showDate: string;
  showTime: string;
  ticketPrice: number;
  status: ShowStatus;
}

export interface BookingRequest {
  showId: number;
  seatNumbers: string[];
  numberOfTickets: number;
}

export interface PaymentRequest {
  bookingId: number;
  paymentMethod: PaymentMethod;
}
