import { Appointment } from '../types/appointment';
import { api } from './apiService';
const STORAGE_KEY='careflow_appointments';
const DEMO_EMAIL='aarav.patel@example.com';
export async function getAppointments():Promise<Appointment[]>{try{return await api.appointments(DEMO_EMAIL);}catch{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');}}
export async function saveAppointment(appointment:Appointment):Promise<void>{try{await api.book({...appointment,patientName:'Aarav Patel',patientEmail:DEMO_EMAIL,patientPhone:localStorage.getItem('careflow_phone')||'' ,doctorId:(appointment as any).doctorId});}catch{const a=await getAppointments();a.push(appointment);localStorage.setItem(STORAGE_KEY,JSON.stringify(a));}}
export async function updateAppointmentStatus(id:string,status:'Upcoming'|'Completed'|'Cancelled'):Promise<void>{try{if(status==='Cancelled'){await api.cancel(id);return;}}catch{}const a=await getAppointments();localStorage.setItem(STORAGE_KEY,JSON.stringify(a.map(x=>x.id===id?{...x,status}:x)));}
export async function saveWaitlistRequest(request:any):Promise<void>{const a=JSON.parse(localStorage.getItem('careflow_waitlist')||'[]');a.push(request);localStorage.setItem('careflow_waitlist',JSON.stringify(a));}
