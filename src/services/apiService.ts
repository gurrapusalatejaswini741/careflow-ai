import { Appointment } from '../types/appointment';
import { Doctor } from '../types/doctor';
const API=import.meta.env.VITE_API_BASE_URL||'';
async function request<T>(path:string,options?:RequestInit):Promise<T>{const r=await fetch(`${API}${path}`,{headers:{'Content-Type':'application/json',...(options?.headers||{})},...options});if(!r.ok)throw new Error((await r.json().catch(()=>({}))).error||`Request failed: ${r.status}`);return r.json();}
export const api={
 doctors:()=>request<Doctor[]>('/api/doctors'),
 appointments:(email:string)=>request<Appointment[]>(`/api/appointments?email=${encodeURIComponent(email)}`),
 book:(payload:any)=>request<any>('/api/appointments',{method:'POST',body:JSON.stringify(payload)}),
 cancel:(id:string)=>request<any>(`/api/appointments/${id}/cancel`,{method:'PATCH',body:'{}'}),
 analyzeImage:async(file:File)=>{const f=new FormData();f.append('image',file);const r=await fetch(`${API}/api/image-analyze`,{method:'POST',body:f});return r.json();}
};
