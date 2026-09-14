import { Hospital, HealthcareService } from '../types/hospital';

// Static demo dataset. No maps API, hospital API, geolocation API or network request is used.
export const HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'Apollo Hospitals, Jubilee Hills', location: 'Jubilee Hills, Hyderabad', distance: '1.2 km away', specialties: ['Dermatology','Cardiology','General Medicine','Orthopedics','Ophthalmology'], doctorsCount: 45, nextAvailable: 'Today, 3:30 PM' },
  { id: 'h2', name: 'Rainbow Children’s Hospital', location: 'Banjara Hills, Hyderabad', distance: '2.5 km away', specialties: ['Pediatrics','General Medicine','ENT'], doctorsCount: 30, nextAvailable: 'Today, 4:00 PM' },
  { id: 'h3', name: 'Fortis Malar Heart Institute', location: 'Somajiguda, Hyderabad', distance: '3.1 km away', specialties: ['Cardiology','Neurology','General Medicine'], doctorsCount: 28, nextAvailable: 'Tomorrow, 10:00 AM' },
  { id: 'h4', name: 'Care Hospitals, HITEC City', location: 'HITEC City, Hyderabad', distance: '0.8 km away', specialties: ['General Medicine','Cardiology','Pediatrics','Dermatology','Gynecology'], doctorsCount: 38, nextAvailable: 'Today, 4:00 PM' },
  { id: 'h5', name: 'MIOT International', location: 'Madhapur, Hyderabad', distance: '2.0 km away', specialties: ['Orthopedics','Dermatology','ENT','Ophthalmology','Dentistry'], doctorsCount: 34, nextAvailable: 'Today, 5:00 PM' },
  { id: 'h6', name: 'KIMS Hospitals', location: 'Secunderabad, Hyderabad', distance: '4.3 km away', specialties: ['Cardiology','Neurology','Orthopedics','General Medicine'], doctorsCount: 52, nextAvailable: 'Tomorrow, 9:30 AM' },
  { id: 'h7', name: 'Yashoda Hospitals', location: 'Somajiguda, Hyderabad', distance: '3.7 km away', specialties: ['Cardiology','Neurology','Gynecology','General Medicine'], doctorsCount: 48, nextAvailable: 'Today, 6:00 PM' },
  { id: 'h8', name: 'Continental Hospitals', location: 'Gachibowli, Hyderabad', distance: '5.0 km away', specialties: ['Orthopedics','Cardiology','Ophthalmology','General Medicine'], doctorsCount: 41, nextAvailable: 'Tomorrow, 11:00 AM' },
  { id: 'h9', name: 'AIG Hospitals', location: 'Gachibowli, Hyderabad', distance: '4.6 km away', specialties: ['Gastroenterology','Cardiology','Neurology','General Medicine'], doctorsCount: 50, nextAvailable: 'Today, 7:00 PM' },
  { id: 'h10', name: 'Basavatarakam Indo-American Cancer Hospital', location: 'Banjara Hills, Hyderabad', distance: '2.8 km away', specialties: ['General Medicine','Oncology','Radiology','Pain Management'], doctorsCount: 36, nextAvailable: 'Tomorrow, 10:30 AM' },
  { id: 'h11', name: 'Sunshine Hospitals', location: 'Paradise, Hyderabad', distance: '4.0 km away', specialties: ['Orthopedics','Neurology','General Medicine','Physiotherapy'], doctorsCount: 29, nextAvailable: 'Today, 4:30 PM' },
  { id: 'h12', name: 'Olive Hospitals', location: 'Mehdipatnam, Hyderabad', distance: '5.4 km away', specialties: ['General Medicine','Pediatrics','Dermatology','Dentistry'], doctorsCount: 24, nextAvailable: 'Tomorrow, 9:00 AM' }
];

export const HEALTHCARE_SERVICES: HealthcareService[] = [
  { id: 's1', title: 'General Medicine', description: 'Comprehensive wellness evaluations and routine checkups.', icon: 'fa-stethoscope', category: 'Primary Care' },
  { id: 's2', title: 'Dermatology', description: 'Expert care for skin, hair, acne, rashes and allergies.', icon: 'fa-hand-dots', category: 'Specialty' },
  { id: 's3', title: 'Cardiology', description: 'Heart health monitoring, ECG and blood pressure care.', icon: 'fa-heart-pulse', category: 'Specialty' },
  { id: 's4', title: 'Pediatrics', description: 'Child wellness, immunization, growth tracking and care.', icon: 'fa-child', category: 'Primary Care' },
  { id: 's5', title: 'Dentistry', description: 'Dental hygiene, cavities, gum care and pain evaluation.', icon: 'fa-tooth', category: 'Specialty' },
  { id: 's6', title: 'Orthopedics', description: 'Joint, back, bone, sports injury and mobility care.', icon: 'fa-bone', category: 'Specialty' },
  { id: 's7', title: 'ENT', description: 'Ear, nose, throat, sinus and hearing evaluations.', icon: 'fa-ear-listen', category: 'Specialty' },
  { id: 's8', title: 'Ophthalmology', description: 'Vision testing, eye examinations and eye care.', icon: 'fa-eye', category: 'Specialty' },
  { id: 's9', title: 'Neurology', description: 'Headache, migraine, dizziness and neurological consultations.', icon: 'fa-brain', category: 'Specialty' },
  { id: 's10', title: 'Gynecology', description: 'Women’s health, menstrual and reproductive healthcare.', icon: 'fa-person-dress', category: 'Specialty' }
];
