# Online Movie Ticket Booking System - Frontend Client Application

[![React](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245.svg?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/IJSE-CMJD%20114%2F115-blueviolet.svg)](https://www.ijse.lk/)

**IJSE | Institute of Software Engineering**  
**Coursework**: CMJD (Comprehensive Master Java Developer) – Batch 114/115  
**Assignment**: 1 – Frontend Client Application with React, TypeScript & Tailwind CSS  
**Task**: Movie Ticket Booking System  

---

## 📖 Project Overview

The **Online Movie Ticket Booking System Frontend** is a modern Single Page Application (SPA) designed to deliver a smooth and engaging movie ticket booking experience. Built using **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, this application communicates directly with the Spring Boot REST backend API.

The client application enables cinema patrons to explore currently screening movies, inspect show details and cinema halls, select available seats in real-time, complete simulated payments, and track their booking history. It also provides administrative users with a dashboard to manage movies, theatres, shows, bookings, and payment records.

---

## 🛠 Tech Stack

| Technology | Specification / Library | Purpose |
| :--- | :--- | :--- |
| **UI Framework** | React 19 (`^19.2.8`) | Reactive component-based interface |
| **Language** | TypeScript (`~6.0.2`) | Static type safety and data models |
| **Build Tool & Server** | Vite 8 (`^8.3.0`) | Lightning-fast HMR and optimized bundling |
| **Styling** | Tailwind CSS v4 (`^4.3.3`) | Modern utility-first responsive styling and dark mode |
| **Routing** | React Router DOM v7 (`^7.18.4`) | Client-side routing & route guards |
| **HTTP Client** | Axios (`^1.20.0`) | REST API communication with JWT interceptors |
| **Icons** | Lucide React (`^1.51.0`) | Clean UI iconography |
| **Linter** | Oxlint (`^1.81.0`) | Fast code linting |

---

## 🚀 Implemented Frontend Features

- 🎬 **Hero & Movie Showcase (`/`, `/movies`)**: Browse featured films, view genres, durations, and release details.
- ℹ️ **Movie Details & Showtimes (`/movies/:id`)**: Comprehensive synopsis, trailer previews, cast, and screening schedule grouped by theatre.
- 🏢 **Theatres & Locations (`/theatres`)**: Explore cinema halls, address information, and contact details.
- 📅 **Show Schedule Explorer (`/shows`)**: Real-time show listings with live filtering and status indicators.
- 💺 **Interactive Seat Selector (`/shows/:id/book`)**: Real-time seat grid representing cinema layouts with seat availability states (Available, Selected, Reserved).
- 💳 **Checkout & Payment Portal (`/bookings/:id/payment`)**: Transparent bill breakdown and payment processing interface.
- 🎟 **My Bookings (`/my-bookings`)**: Personalized booking history with seat summaries, booking status, and printable tickets.
- 🔐 **Authentication & Authorization (`/login`, `/register`)**: JWT-based login, persistent session storage, and role-based route protection (`CUSTOMER`, `ADMIN`).
- 🛠 **Admin Management Console (`/admin`)**: Full CRUD management interface for movies, theatres, shows, customer bookings, and financial payment entries.
- 🔮 **Platform Technical Roadmap (`/future-proposals`)**: Interactive showcase of planned enterprise enhancements and architecture roadmap.

---

## 📂 Project Structure

```
frontend/
├── public/                 # Static public assets
├── src/
│   ├── api/                # Axios instance, endpoints & API call definitions
│   │   ├── authApi.ts
│   │   ├── bookingApi.ts
│   │   ├── movieApi.ts
│   │   ├── paymentApi.ts
│   │   ├── showApi.ts
│   │   └── theatreApi.ts
│   ├── components/         # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/            # Global state (AuthContext with JWT persistence)
│   │   └── AuthContext.tsx
│   ├── pages/              # Application views & route handlers
│   │   ├── AdminDashboardPage.tsx
│   │   ├── FutureProposalsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MovieDetailsPage.tsx
│   │   ├── MyBookingsPage.tsx
│   │   ├── PaymentPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── SeatSelectionPage.tsx
│   │   ├── ShowsPage.tsx
│   │   └── TheatresPage.tsx
│   ├── types/              # TypeScript interfaces and API contract models
│   │   └── index.ts
│   ├── App.tsx             # Root routing and application layout
│   ├── index.css           # Global Tailwind CSS configurations
│   └── main.tsx            # Application entry point
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x LTS installed
- Running Spring Boot Backend API on `http://localhost:8080`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 🔮 Future Expansion – Student Proposal

### 📋 Overview of Assignment Requirement
> **Student Proposal Guideline**:
> *Students should identify at least two possible future enhancements for the frontend application and briefly explain how those enhancements could improve the user experience.*

To provide a comprehensive roadmap for future versions of the Movie Ticket Booking System, the following proposals examine **all candidate expansion modules** with an emphasis on **User Experience (UX) enhancements**, **UI interaction patterns**, and **architectural benefits**.

---

### 📊 Summary Matrix of Proposed Enhancements

| # | Proposal Enhancement | Target Users | Core UX Impact | Implementation Complexity |
|---|---|---|---|:---:|
| 1 | **Interactive Theatre Screen and Seat Layout** | Patrons | Eliminates seat selection guesswork; spatial visual perspective | Medium |
| 2 | **Multiple-Screen Support (Auditorium Formats)** | Patrons | Select between IMAX 3D, Dolby Atmos, and VIP suites | Medium |
| 3 | **Movie Reviews and Ratings Interface** | Patrons | Fast, informed booking choices with social proof | Low - Medium |
| 4 | **Discount and Promotional Code Interface** | Patrons | Immediate price transparency, coupon validation & loyalty incentives | Low - Medium |
| 5 | **Email/SMS Notification Interface & Digital Pass** | Patrons | Frictionless mobile entry, instant booking reassurance & QR check-in | Medium |
| 6 | **Advanced Movie and Show Search & Filtering** | Patrons | Instant typeahead search, faceted filtering (language, genre, time) | Low - Medium |
| 7 | **Booking and Revenue Dashboard** | Admins | Visual operational heatmaps, real-time occupancy and sales metrics | Medium - High |
| 8 | **Online Payment Gateway Integration** | Patrons & Admins | Secure 3D-Secure payment cards, mobile wallets (PayHere / Stripe) | Medium - High |

---

### 🌟 Detailed Enhancement Proposals

---

### Proposal 1: Interactive Theatre Screen and Seat Layout

#### 1. Proposed Feature Description
Replace the uniform seat grid with an **interactive SVG / Canvas-based cinema auditorium layout**. The component displays:
- A curved, illuminated cinema screen arc at the front with a dynamic viewing angle indicator.
- Distinct tiered seating zones: **VIP Recliners** (front/middle elevated), **Premium Circle**, and **Standard Rows**.
- Realistic architectural features: physical aisles, emergency exits, and wheelchair-accessible companion spots.
- Live seat status color coding (Available: Emerald/Slate, Selected: Rose/Glow, Held: Amber, Reserved: Muted Gray).

#### 2. User Experience (UX) Improvements
- **Spatial Orientation & Viewing Perspective**: Users can immediately evaluate how close a seat is to the screen and whether it sits centrally or at an oblique angle, avoiding unpleasant surprises during the screening.
- **Micro-Interactions & Tactile Feedback**: Smooth hover animations show seat coordinates (e.g., `Row D - Seat 14`) along with price tooltips. Dynamic seat selection sounds and animated selection counters offer instant reassurance.
- **Contiguous Group Seating**: When selecting tickets for families or friends, the UI visually highlights adjacent seat groups, simplifying group reservations.
- **Seat Tier Transparency**: Hovering over VIP recliners or couples' seats displays amenities (e.g., extra legroom, heated recliners, food-to-seat service) alongside the tiered ticket price.

---

### Proposal 2: Multiple-Screen Support (Auditorium & Technology Format Selection)

#### 1. Proposed Feature Description
Cinema complexes feature multiple auditoriums under one roof (e.g., *Screen 1 – IMAX with Laser*, *Screen 2 – Dolby Atmos 7.1*, *Screen 3 – VIP Gold Class*). The frontend introduces an **Auditorium Format Switcher** across the movie details and showtime selection pages.

#### 2. User Experience (UX) Improvements
- **Format-First Decision Making**: Moviegoers who prioritize premium experiences (e.g., viewing an action blockbuster exclusively on an IMAX Laser screen) can filter screenings by audio/visual format rather than parsing through wall-of-text schedules.
- **Elimination of Booking Ambiguity**: Each showtime badge prominently displays the specific auditorium name and sound/projection badges (e.g., `4K Dual Laser`, `Dolby Atmos`), ensuring customers book the exact technological experience they expect.
- **Multi-Auditorium Schedule Navigation**: A tabbed horizontal carousel enables users to compare start times across different screens within the same cinema complex without leaving the page.

---

### Proposal 3: Movie Reviews, Ratings, and Audience Feedback Interface

#### 1. Proposed Feature Description
Integrate a community-driven rating and feedback ecosystem directly into the movie details view:
- Dynamic 5-star interactive rating component and verified-buyer written review cards.
- Aggregate visual rating progress bars (distribution of 1 to 5 stars) and a "Critic Consensus vs. Audience Score" metric.
- A "Verified Ticket Holder" badge next to reviewers who placed an authentic booking through the platform.

#### 2. User Experience (UX) Improvements
- **Informed and Frictionless Decision Making**: Patrons do not need to leave the platform to check external sites like IMDb or Rotten Tomatoes before deciding on a movie.
- **Authenticity and Social Proof**: The "Verified Ticket Holder" badge prevents spam reviews, giving moviegoers confidence in crowd sentiment.
- **Post-Movie Engagement**: Customers receive an unobtrusive prompt on their "My Bookings" page 3 hours after their showtime: *"How was the movie? Leave a quick rating"*, keeping users actively engaged with the service.

---

### Proposal 4: Discount and Promotional Code Interface

#### 1. Proposed Feature Description
An integrated promotion and coupon application widget embedded inside the checkout and payment process:
- A clean promo code input field with real-time asynchronous validation (e.g., verifying validity, minimum spend, expiry date).
- One-click "Available Offers" drawer displaying active cardholder promotions (e.g., *"Commercial Bank: Buy 1 Get 1 Free on Fridays"* or *"Student 20% OFF"* with promo code `STUDENT20`).
- Real-time animated discount line item displaying gross subtotal, applied discount deduction in green, and revised net payable total.

#### 2. User Experience (UX) Improvements
- **Positive Psychological Reinforcement**: Immediate green badge updates (e.g., `🎉 You saved LKR 750 with code MOVIENIGHT!`) give buyers a sense of reward and savings.
- **Reduced Checkout Abandonment**: Providing a browsable list of applicable coupons eliminates the frustration of having to search third-party voucher sites.
- **Clear Error Messaging**: If a promo code has expired or requires a higher ticket count, a polite inline message (e.g., *"This voucher requires at least 2 tickets in your cart"*) guides the user to resolve the issue without clearing their booking.

---

### Proposal 5: Automated Email / SMS Notification Interface & Digital E-Ticket Pass

#### 1. Proposed Feature Description
A multi-channel confirmation and pass delivery interface:
- A post-payment **Digital E-Ticket Pass** featuring a high-density, cryptographically signed QR code.
- User settings toggles for delivery preferences: Instant SMS confirmation, Email receipt with embedded PDF pass, or browser push reminders.
- Single-click action buttons: *"Save Ticket PDF"*, *"Add to Apple Wallet / Google Wallet"*, and *"Share via WhatsApp"*.

#### 2. User Experience (UX) Improvements
- **Instant Confirmation & Stress Relief**: Immediate receipt via SMS and email provides peace of mind that payment was received and seats are secured.
- **Turnstile-Ready Fast Check-in**: Patrons present the QR code directly from their mobile screen at the cinema turnstile or usher scanner, bypassing ticket counter lines entirely.
- **Smart Showtime Countdown**: Mobile notifications 2 hours prior to the show provide navigation directions, parking advice, and cinema entry guidelines, ensuring customers arrive relaxed and on time.

---

### Proposal 6: Advanced Movie and Show Search & Multi-Faceted Filter System

#### 1. Proposed Feature Description
A search and filtering toolbar on the home and shows pages:
- Debounced typeahead search input that queries movie titles, directors, actors, and genre tags in real-time.
- Multi-faceted filter drawer: Filter by **Genre** (Action, Sci-Fi, Drama), **Language / Subtitles** (English, Sinhala, Tamil), **Age Rating** (PG-13, R), **Date Range**, and **Screen Format** (2D, 3D, IMAX).
- Dynamic sort dropdown: *Most Popular*, *Highest Rated*, *Release Date*, and *Alphabetical*.

#### 2. User Experience (UX) Improvements
- **Sub-Second Discovery**: Users find their desired movie within keystrokes instead of scanning lengthy catalogs.
- **Discovery for Indecisive Viewers**: Family groups can filter specifically for *"G/PG rated animated movies showing this Saturday afternoon in Colombo"*, providing actionable options for weekend planning.
- **Zero Dead-Ends**: Filter badges display dynamic count indicators (e.g., `Sci-Fi (4)`), preventing users from setting filter combinations that yield empty search results.

---

### Proposal 7: Administrative Booking and Revenue Analytics Dashboard

#### 1. Proposed Feature Description
A comprehensive visual analytics suite for cinema managers and administrative staff:
- Key metric summary cards: **Total Revenue**, **Ticket Occupancy Rate (%)**, **Active Showtimes**, and **Total Patrons**.
- Interactive charts: Daily & weekly revenue bar charts, movie-wise earnings distribution, and hourly occupancy heatmaps.
- Quick operational actions: One-click CSV/PDF sales exports, booking cancellation handling, and manual customer ticket verification tools.

#### 2. User Experience (UX) Improvements
- **Clarity Over Raw Data**: Replaces dense database tables with clean charts, allowing theatre administrators to digest business health in seconds.
- **Operational Agility**: Identifying high-occupancy showtimes enables managers to schedule additional screenings on larger screens to capture unmet customer demand.
- **Responsive Management**: Admins can quickly search bookings by customer email or booking reference to resolve customer queries efficiently.

---

### Proposal 8: Online Payment Gateway Integration (PayHere / Stripe / IPG)

#### 1. Proposed Feature Description
Upgrade the mock payment workflow to a direct integration with production payment gateways (e.g., **PayHere Sri Lanka**, **Commercial Bank IPG**, or **Stripe**):
- A secure checkout modal supporting Credit/Debit Cards (Visa, MasterCard, Amex), mobile wallets (FriMi, Genie, eZ Cash), and online banking.
- 3D-Secure 2.0 OTP authentication screen with an embedded timer.
- Real-time payment verification polling with loading animations and idempotent state safeguards.

#### 2. User Experience (UX) Improvements
- **Trust & Security Assurance**: Clean, PCI-DSS compliant payment frames with verified security badges reassure users when entering financial credentials.
- **Payment Method Flexibility**: Catering to local payment preferences (e.g., mobile wallets and local debit cards) reduces barriers for patrons who do not use international credit cards.
- **Graceful Failure Recovery**: If a transaction fails (e.g., due to an OTP timeout or insufficient balance), the UI retains the selected seats and presents clear diagnostic guidance alongside a *"Try Another Card"* button, avoiding cart resets.

---

### 📈 User Experience (UX) Comparison: Current vs. Proposed

| Feature Area | Current Application UX | Enhanced Proposed UX |
| :--- | :--- | :--- |
| **Seat Selection** | Uniform grid without screen orientation or tier pricing | Curved visual auditorium, tiered VIP/Standard zones, viewing angle guide |
| **Screens** | Single capacity number assigned to theatre | Multi-screen selector (IMAX Laser, Dolby Atmos, VIP suites) with tech specs |
| **Decision Making** | Static synopsis and poster image | Integrated verified-buyer ratings, star breakdowns, and audience consensus |
| **Checkout & Pricing** | Fixed subtotal calculation | Real-time coupon engine, bank promo discounts, and instant savings alerts |
| **Ticketing** | On-screen booking ID text | Digital QR e-ticket pass, SMS alerts, PDF downloads, and Apple/Google Wallet integration |
| **Movie Discovery** | Manual scrolling across movie cards | Debounced instant typeahead search, faceted filters (genre, language, time) |
| **Management** | Tabular records for movies, shows, and bookings | Visual analytics dashboard with revenue charts and occupancy heatmaps |
| **Payment** | Basic simulated payment input | Secure 3D-Secure payment gateway with local mobile wallets and card tokens |

---

## 👨‍💻 Developer & Coursework Details

- **Student / Developer**: IJSE Student
- **Course**: CMJD (Comprehensive Master Java Developer) Batch 114/115
- **Institute**: Institute of Software Engineering (IJSE), Sri Lanka
- **Module**: Assignment 1 – Frontend Client Application (React & Tailwind CSS)
