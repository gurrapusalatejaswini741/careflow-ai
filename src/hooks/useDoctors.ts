import { useState,useEffect } from 'react';
import { Doctor } from '../types/doctor';
import { fetchDoctors } from '../services/doctorService';
export function useDoctors(){const [doctors,setDoctors]=useState<Doctor[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState<string|null>(null);useEffect(()=>{let live=true;const refresh=()=>fetchDoctors().then(d=>{if(live){setDoctors(d);setLoading(false);setError(null)}}).catch(()=>{if(live){setError('Failed to load doctors.');setLoading(false)}});refresh();const timer=window.setInterval(refresh,10000);return()=>{live=false;window.clearInterval(timer)}},[]);return {doctors,loading,error};}
