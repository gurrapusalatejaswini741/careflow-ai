import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import crypto from 'crypto';

dotenv.config({ path: new URL('./.env', import.meta.url) });

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(',')
      : '*'
  })
);

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024
  }
});

/* =========================================================
   DATABASE SCHEMAS
========================================================= */

const DoctorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    name: String,
    gender: String,
    specialty: String,
    hospital: String,
    rating: Number,
    reviewsCount: Number,
    experience: String,
    location: String,
    nextSlot: String,
    fee: Number,
    availableDates: [String],
    slots: {
      type: Map,
      of: [String]
    },
    about: String,
    doctorPhone: String
  },
  {
    timestamps: true
  }
);

const AppointmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    patientName: String,
    patientPhone: String,
    patientEmail: String,
    doctorId: String,
    doctorName: String,
    doctorPhone: String,
    specialty: String,
    hospital: String,
    date: String,
    time: String,
    status: {
      type: String,
      enum: ['Upcoming', 'Completed', 'Cancelled']
    },
    fee: Number
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);
const Appointment = mongoose.model(
  'Appointment',
  AppointmentSchema
);

/* =========================================================
   HOSPITAL DATA
========================================================= */

const hospitalData = [
  [
    'h1',
    'Apollo Hospitals, Greams Road',
    'Chennai',
    '21 Greams Lane, Chennai, Tamil Nadu 600006'
  ],
  [
    'h2',
    'Kauvery Hospital, Alwarpet',
    'Chennai',
    '81, TTK Road, Alwarpet, Chennai, Tamil Nadu 600018'
  ],
  [
    'h3',
    'MGM Healthcare, Aminjikarai',
    'Chennai',
    '72, Nelson Manickam Road, Chennai, Tamil Nadu 600029'
  ],
  [
    'h4',
    'SIMS Hospital, Vadapalani',
    'Chennai',
    'No.1, Jawaharlal Nehru Road, Vadapalani, Chennai, Tamil Nadu 600026'
  ],
  [
    'h5',
    'Sri Ramachandra Medical Centre',
    'Chennai',
    'Porur, Chennai, Tamil Nadu 600116'
  ],
  [
    'h6',
    'Kauvery Hospital, Cantonment',
    'Trichy',
    'Tennur High Road, Trichy, Tamil Nadu 620017'
  ],
  [
    'h7',
    'KMC Speciality Hospital',
    'Trichy',
    'Cantonment, Trichy, Tamil Nadu 620001'
  ],
  [
    'h8',
    'GVN Hospital',
    'Trichy',
    'Singarathope, Trichy, Tamil Nadu 620002'
  ]
];

/* =========================================================
   DOCTOR DATA
========================================================= */

const specialties = [
  'General Medicine',
  'Dermatology',
  'Pediatrics',
  'Cardiology',
  'Orthopedics',
  'Dentistry',
  'Ophthalmology',
  'ENT',
  'Neurology',
  'Gynecology'
];

const names = [
  'Dr. Ananya Krishnan',
  'Dr. Arun Kumar',
  'Dr. Meena Raj',
  'Dr. Karthik Srinivasan',
  'Dr. Priya Raman',
  'Dr. Suresh Iyer',
  'Dr. Kavya Nair',
  'Dr. Naveen Kumar',
  'Dr. Divya Mohan',
  'Dr. Lakshmi Devi',
  'Dr. Rahul Menon',
  'Dr. Aishwarya Rao',
  'Dr. Sanjay Prasad',
  'Dr. Swetha Kumar',
  'Dr. Vishal Anand',
  'Dr. Harini Raj'
];

const dates = [
  '2026-09-13',
  '2026-09-14',
  '2026-09-15',
  '2026-09-16',
  '2026-09-17'
];

const slots = [
  '9:00 AM',
  '10:00 AM',
  '11:30 AM',
  '2:00 PM',
  '4:00 PM',
  '5:30 PM',
  '7:00 PM'
];

function seedDoctors() {
  return names.map((name, i) => {
    const specialty =
      specialties[i % specialties.length];

    const city = i < 10 ? 'Chennai' : 'Trichy';

    const hospitals =
      city === 'Chennai'
        ? hospitalData.slice(0, 5)
        : hospitalData.slice(5);

    const hospital =
      hospitals[i % hospitals.length][1];

    const gender = i % 2 ? 'Male' : 'Female';

    return {
      id: String(i + 1),
      name,
      gender,
      specialty,
      hospital,
      rating: Number(
        (4.6 + (i % 4) * 0.1).toFixed(1)
      ),
      reviewsCount: 70 + i * 9,
      experience: `${7 + (i % 9)} years`,
      location: city,
      nextSlot: `Today, ${
        slots[(i + 2) % slots.length]
      }`,
      fee: 550 + (i % 6) * 75,
      availableDates: dates,
      slots: Object.fromEntries(
        dates.map((date) => [date, slots])
      ),
      doctorPhone: `+91900000${String(
        1000 + i
      ).padStart(4, '0')}`,
      about:
        `Demo CareFlow profile for ${specialty} care in ${city}. ` +
        `Doctor profile data is seeded for this working prototype; ` +
        `verify provider details before production use.`
    };
  });
}

/* =========================================================
   WHATSAPP NOTIFICATION
========================================================= */

async function notifyWhatsApp(to, message) {
  if (!to) {
    return {
      sent: false,
      reason: 'phone number missing'
    };
  }

  const token =
    process.env.WHATSAPP_ACCESS_TOKEN;

  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID;

  /*
   * If WhatsApp API credentials are not configured,
   * return a fallback WhatsApp link.
   */
  if (!token || !phoneNumberId) {
    return {
      sent: false,
      reason: 'WhatsApp API not configured',
      fallback:
        `https://wa.me/${to.replace(/\D/g, '')}` +
        `?text=${encodeURIComponent(message)}`
    };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''),
          type: 'text',
          text: {
            body: message
          }
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        sent: true,
        data
      };
    }

    return {
      sent: false,
      reason:
        data?.error?.message ||
        'WhatsApp send failed'
    };
  } catch (error) {
    return {
      sent: false,
      reason: error.message
    };
  }
}

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'CareFlow API',
    mongodb:
      mongoose.connection.readyState === 1,
    whatsappConfigured:
      Boolean(
        process.env.WHATSAPP_ACCESS_TOKEN
      )
  });
});

/* =========================================================
   DOCTORS
========================================================= */

app.get('/api/doctors', async (req, res) => {
  try {
    const query = {};

    if (
      req.query.specialty &&
      req.query.specialty !== 'All'
    ) {
      query.specialty = req.query.specialty;
    }

    if (
      req.query.gender &&
      req.query.gender !== 'All'
    ) {
      query.gender = req.query.gender;
    }

    if (
      req.query.location &&
      req.query.location !== 'All'
    ) {
      query.location = req.query.location;
    }

    const doctors = await Doctor
      .find(query)
      .lean();

    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/* =========================================================
   HOSPITALS
========================================================= */

app.get('/api/hospitals', (req, res) => {
  const hospitals = hospitalData.map(
    ([id, name, city, address]) => ({
      id,
      name,
      city,
      address
    })
  );

  res.json(hospitals);
});

/* =========================================================
   APPOINTMENTS - GET
========================================================= */

app.get(
  '/api/appointments',
  async (req, res) => {
    try {
      const email = req.query.email;

      if (!email) {
        return res.status(400).json({
          error: 'email is required'
        });
      }

      const appointments =
        await Appointment.find({
          patientEmail: email
        })
          .sort({ createdAt: -1 })
          .lean();

      res.json(appointments);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
);

/* =========================================================
   APPOINTMENT - BOOK
========================================================= */

app.post(
  '/api/appointments',
  async (req, res) => {
    try {
      const booking = req.body;

      if (
        !booking.doctorId ||
        !booking.date ||
        !booking.time ||
        !booking.patientPhone
      ) {
        return res.status(400).json({
          error:
            'doctorId, date, time and patientPhone are required'
        });
      }

      /*
       * Prevent two patients from booking
       * the same doctor/time.
       */
      const conflict =
        await Appointment.findOne({
          doctorId: booking.doctorId,
          date: booking.date,
          time: booking.time,
          status: 'Upcoming'
        });

      if (conflict) {
        return res.status(409).json({
          error:
            'This slot was just booked by another patient.'
        });
      }

      /*
       * Get the doctor from database so
       * doctor phone is available for cancellation.
       */
      const doctor =
        await Doctor.findOne({
          id: booking.doctorId
        }).lean();

      if (!doctor) {
        return res.status(404).json({
          error: 'Doctor not found'
        });
      }

      const id = crypto.randomUUID();

      const appointment =
        await Appointment.create({
          id,

          patientName:
            booking.patientName || '',

          patientPhone:
            booking.patientPhone,

          patientEmail:
            booking.patientEmail || '',

          doctorId:
            doctor.id,

          doctorName:
            doctor.name,

          doctorPhone:
            doctor.doctorPhone,

          specialty:
            doctor.specialty,

          hospital:
            doctor.hospital,

          date:
            booking.date,

          time:
            booking.time,

          status: 'Upcoming',

          fee:
            booking.fee ?? doctor.fee
        });

      /* ================================
         PATIENT CONFIRMATION MESSAGE
      ================================= */

      const message =
        `CareFlow AI appointment confirmed.\n\n` +
        `Doctor: ${doctor.name}\n` +
        `Specialty: ${doctor.specialty}\n` +
        `Hospital: ${doctor.hospital}\n` +
        `Date: ${booking.date}\n` +
        `Time: ${booking.time}\n` +
        `Appointment ID: ${id}`;

      const notification =
        await notifyWhatsApp(
          booking.patientPhone,
          message
        );

      res.status(201).json({
        appointment,
        notification
      });
    } catch (error) {
      console.error(
        'Booking error:',
        error
      );

      res.status(500).json({
        error: error.message
      });
    }
  }
);

/* =========================================================
   APPOINTMENT - CANCEL
========================================================= */

app.patch(
  '/api/appointments/:id/cancel',
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findOneAndUpdate(
          {
            id: req.params.id,
            status: 'Upcoming'
          },
          {
            status: 'Cancelled'
          },
          {
            new: true
          }
        );

      if (!appointment) {
        return res.status(404).json({
          error:
            'Upcoming appointment not found'
        });
      }

      const message =
        `CareFlow AI: appointment cancelled.\n\n` +
        `Appointment ID: ${appointment.id}\n` +
        `Doctor: ${appointment.doctorName}\n` +
        `Hospital: ${appointment.hospital}\n` +
        `Date: ${appointment.date}\n` +
        `Time: ${appointment.time}`;

      /*
       * Notify patient
       */
      const patientNotification =
        await notifyWhatsApp(
          appointment.patientPhone,
          message
        );

      /*
       * Notify doctor
       */
      const doctorPhone =
        req.body?.doctorPhone ||
        appointment.doctorPhone;

      let doctorNotification;

      if (doctorPhone) {
        doctorNotification =
          await notifyWhatsApp(
            doctorPhone,
            message
          );
      } else {
        doctorNotification = {
          sent: false,
          reason:
            'doctor phone number not configured'
        };
      }

      res.json({
        appointment,
        notifications: {
          patient:
            patientNotification,
          doctor:
            doctorNotification
        }
      });
    } catch (error) {
      console.error(
        'Cancellation error:',
        error
      );

      res.status(500).json({
        error: error.message
      });
    }
  }
);

/* =========================================================
   IMAGE ANALYSIS
========================================================= */

app.post(
  '/api/image-analyze',
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'image is required'
        });
      }

      /*
       * We do NOT pretend to have medical
       * image AI when no provider is configured.
       */
      if (!process.env.VISION_API_KEY) {
        return res.json({
          configured: false,
          message:
            'Image uploaded successfully, but medical image AI is not configured yet. Add VISION_API_KEY to enable analysis.',
          suggestedSpecialty:
            'General Medicine',
          safety:
            'Do not use an image result as a diagnosis.'
        });
      }

      const base64 =
        req.file.buffer.toString('base64');

      const visionUrl =
        process.env.VISION_API_URL ||
        'https://api.openai.com/v1/chat/completions';

      const response = await fetch(
        visionUrl,
        {
          method: 'POST',

          headers: {
            Authorization:
              `Bearer ${process.env.VISION_API_KEY}`,

            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({
            model:
              process.env.VISION_MODEL ||
              'gpt-4o-mini',

            messages: [
              {
                role: 'system',

                content:
                  'You are a healthcare navigation assistant. Never diagnose. Identify only a broad visible concern category and suggest a medical specialty. If the image is unclear or not medically interpretable, say so.'
              },

              {
                role: 'user',

                content: [
                  {
                    type: 'text',

                    text:
                      'Review this image for broad healthcare navigation only. Do not diagnose. Return JSON with concern, suggestedSpecialty, confidence, and explanation.'
                  },

                  {
                    type: 'image_url',

                    image_url: {
                      url:
                        `data:${req.file.mimetype};base64,${base64}`
                    }
                  }
                ]
              }
            ],

            max_tokens: 300
          })
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        return res.status(502).json({
          error:
            data?.error?.message ||
            'Vision API request failed'
        });
      }

      res.json({
        configured: true,
        raw: data
      });
    } catch (error) {
      console.error(
        'Image analysis error:',
        error
      );

      res.status(500).json({
        error: error.message
      });
    }
  }
);

/* =========================================================
   START SERVER
========================================================= */

const PORT =
  process.env.PORT || 4000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/careflow';

async function startServer() {
  try {
    console.log(
      'Connecting to MongoDB...'
    );

    await mongoose.connect(
      MONGODB_URI
    );

    console.log(
      'MongoDB connected'
    );

    /*
     * Seed demo doctors automatically
     * when database is empty.
     */
    const doctorCount =
      await Doctor.countDocuments();

    if (doctorCount === 0) {
      await Doctor.insertMany(
        seedDoctors()
      );

      console.log(
        'Demo doctors seeded'
      );
    } else {
      console.log(
        `Doctors already available: ${doctorCount}`
      );
    }

    app.listen(
      PORT,
      () => {
        console.log(
          `CareFlow API running on http://localhost:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      'Server startup failed:',
      error.message
    );

    process.exit(1);
  }
}

startServer();