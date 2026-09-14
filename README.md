# CareFlow AI

**AI-Powered Healthcare Navigation and Doctor Appointment Platform**

CareFlow AI is a full-stack healthcare navigation platform that helps users discover doctors, explore hospitals, book appointments, and use AI-assisted image analysis for healthcare navigation.

> **Disclaimer:** CareFlow AI is a healthcare navigation and support platform. AI-generated results are not medical diagnoses and should not replace professional medical advice.

## Features

- **Doctor Discovery** — Browse doctors and filter them by specialty, gender, and location.
- **Doctor Profiles** — View doctor experience, ratings, consultation fees, hospitals, and available appointment slots.
- **Hospital Discovery** — Browse hospitals, locations, and addresses.
- **Appointment Booking** — Select a doctor, date, and time and create an appointment.
- **Appointment Management** — View appointment history and cancel upcoming appointments.
- **Conflict Prevention** — Prevents duplicate bookings for the same doctor, date, and time.
- **AI Image Analysis** — Upload a healthcare-related image and receive a broad concern category and suggested medical specialty.
- **AI Healthcare Navigation** — Helps users navigate toward an appropriate healthcare specialty without presenting the result as a diagnosis.
- **WhatsApp Notifications** — Supports WhatsApp Cloud API notifications for appointment confirmations and cancellations.
- **MongoDB Database** — Stores doctor and appointment information using MongoDB Atlas.
- **Automatic Demo Data** — Seeds demonstration doctors when the database is empty.

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

### AI
- OpenAI API
- Vision-capable AI model

### Other
- REST API
- WhatsApp Cloud API
- Git
- GitHub
- Render

## Project Structure

```text
CareFlow_AI_Real_System/
│
├── src/
│   ├── components/
│   │   ├── AISearchInterpreterModal.tsx
│   │   ├── ImageDoctorFinder.tsx
│   │   ├── DoctorCard.tsx
│   │   ├── HospitalCard.tsx
│   │   ├── AppointmentCard.tsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── FindDoctor.tsx
│   │   ├── DoctorDetails.tsx
│   │   ├── Hospitals.tsx
│   │   ├── MyAppointments.tsx
│   │   └── ...
│   │
│   ├── services/
│   │   ├── aiService.ts
│   │   ├── apiService.ts
│   │   ├── doctorService.ts
│   │   ├── hospitalService.ts
│   │   └── appointmentService.ts
│   │
│   ├── hooks/
│   ├── types/
│   └── utils/
│
├── server/
│   ├── index.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── dist/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
