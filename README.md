# Scholarship Application Portal

## Purpose
This project allows students to explore scholarships, apply securely, pay application fees via Stripe, track application status, and submit feedback. It provides an easy-to-use dashboard for both students and admin management.

## Live URL


## Key Features

### Student Features
- Register and login securely
- Browse scholarships by university, country, category, and degree
- Apply for scholarships with application fee payment
- Stripe payment integration with success, failure, and cancellation handling
- Dashboard to view all applications with status and payment information
- Edit or delete pending applications
- Retry payment for unpaid applications
- Submit reviews/feedback for completed applications
- Responsive UI for desktop and mobile devices
- Notifications on payment status and application updates

### Admin Features
- Manage scholarships (add, edit, delete)
- View all student applications
- Approve or reject applications
- View student feedback and reviews
- Monitor payment transactions
- Dashboard analytics for applications and payments

### Extra Features
- Animated UI components using Framer Motion
- SweetAlert2 notifications for alerts and confirmations
- Role-based authentication (student/admin)
- Server-side validation for secure data handling
- MongoDB for persistent data storage
- Cross-origin request handling with CORS

## NPM Packages Used
- `react` – Frontend UI library
- `react-router-dom` – Routing
- `axios` – HTTP requests
- `sweetalert2` – Alerts and notifications
- `react-icons` – Icons for UI elements
- `framer-motion` – Animations
- `stripe` – Stripe payment integration
- `mongodb` – Database
- `cors` – Cross-Origin requests handling
- `express` – Backend server
- `dotenv` – Environment variable management
- `jsonwebtoken` – Authentication

## Setup Instructions
1. Clone the repository:
     ```bash
   git clone https://github.com/Rehenabegum109/-ScholarStream.git
   cd -ScholarStream
