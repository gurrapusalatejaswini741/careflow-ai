export interface Hospital {
  id: string;
  name: string;
  location: string;
  distance: string;
  specialties: string[];
  doctorsCount: number;
  nextAvailable: string;
}

export interface HealthcareService {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}
