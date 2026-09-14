import { Doctor } from '../types/doctor';

const DATES = ['2026-09-13', '2026-09-14', '2026-09-15', '2026-09-16'];
const SLOTS = ['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM'];

const doctors: Doctor[] = [
  ['1','Dr. Ananya Sharma','Female','Dermatology','Apollo Hospitals, Jubilee Hills','Hyderabad','4.8',124,8,700,'Skin, acne and hair care specialist.'],
  ['2','Dr. Rahul Kumar','Male','General Medicine','Care Hospitals, HITEC City','Hyderabad','4.7',98,10,600,'Primary care physician for common illnesses and preventive checkups.'],
  ['3','Dr. Priya Reddy','Female','Cardiology','Fortis Malar Heart Institute','Hyderabad','4.9',156,12,900,'Experienced in preventive and clinical cardiac care.'],
  ['4','Dr. Arjun Mehta','Male','Orthopedics','Apollo Hospitals, Jubilee Hills','Hyderabad','4.8',111,11,800,'Joint, spine, sports injury and mobility care.'],
  ['5','Dr. Sneha Iyer','Female','Pediatrics','Rainbow Children’s Hospital','Hyderabad','4.9',183,9,650,'Child wellness, immunization and pediatric care.'],
  ['6','Dr. Vikram Rao','Male','Dentistry','Care Hospitals, HITEC City','Hyderabad','4.6',87,7,550,'General dentistry, cavities and preventive oral care.'],
  ['7','Dr. Meera Nair','Female','Ophthalmology','Apollo Hospitals, Jubilee Hills','Hyderabad','4.8',132,10,750,'Vision testing and comprehensive eye care.'],
  ['8','Dr. Karthik Menon','Male','ENT','Rainbow Children’s Hospital','Hyderabad','4.7',76,8,600,'Ear, nose, throat and sinus care for children and adults.'],
  ['9','Dr. Divya Srinivas','Female','Neurology','Fortis Malar Heart Institute','Hyderabad','4.9',143,13,1000,'Neurological consultations including headache and migraine care.'],
  ['10','Dr. Neha Kapoor','Female','Gynecology','Apollo Hospitals, Jubilee Hills','Hyderabad','4.8',165,12,850,'Women’s health, menstrual and reproductive healthcare.'],
  ['11','Dr. Sanjay Verma','Male','General Medicine','MIOT International','Hyderabad','4.6',91,9,550,'General physician focused on adult primary care.'],
  ['12','Dr. Lakshmi Devi','Female','Dermatology','MIOT International','Hyderabad','4.7',105,7,650,'Medical and cosmetic dermatology consultations.'],
  ['13','Dr. Naveen Joseph','Male','Cardiology','Care Hospitals, HITEC City','Hyderabad','4.8',119,14,950,'Heart health, hypertension and cardiac risk assessment.'],
  ['14','Dr. Aishwarya Rao','Female','Orthopedics','MIOT International','Hyderabad','4.7',88,8,750,'Orthopedic care for joint, knee and back problems.'],
  ['15','Dr. Rohit Bansal','Male','Pediatrics','Rainbow Children’s Hospital','Hyderabad','4.8',140,10,650,'Pediatric consultations and child development monitoring.'],
  ['16','Dr. Farah Khan','Female','Dentistry','Apollo Hospitals, Jubilee Hills','Hyderabad','4.9',101,9,600,'Family dentistry and preventive oral healthcare.'],
  ['17','Dr. Suresh Iyer','Male','Ophthalmology','Care Hospitals, HITEC City','Hyderabad','4.7',95,11,700,'Eye examinations, vision concerns and cataract screening.'],
  ['18','Dr. Kavya Menon','Female','ENT','MIOT International','Hyderabad','4.8',84,8,600,'Sinus, throat, ear and hearing consultations.'],
  ['19','Dr. Aditya Shah','Male','Neurology','Apollo Hospitals, Jubilee Hills','Hyderabad','4.8',128,12,950,'Headache, migraine and neurological symptom evaluation.'],
  ['20','Dr. Pooja Nair','Female','Gynecology','Care Hospitals, HITEC City','Hyderabad','4.9',152,11,800,'Women’s wellness and menstrual health consultations.']
].map(([id,name,gender,specialty,hospital,location,rating,reviews,years,fee,about]) => ({
  id: String(id), name: String(name), gender: String(gender), specialty: String(specialty), hospital: String(hospital),
  rating: Number(rating), reviewsCount: Number(reviews), experience: `${years} years`, location: String(location),
  nextSlot: 'Today, 5:30 PM', fee: Number(fee), availableDates: DATES,
  slots: Object.fromEntries(DATES.map((date) => [date, SLOTS])), about: String(about)
}));

export async function fetchDoctors(): Promise<Doctor[]> {
  try { const r=await fetch('/api/doctors'); if(r.ok) return await r.json(); } catch {}
  return Promise.resolve(doctors);
}
