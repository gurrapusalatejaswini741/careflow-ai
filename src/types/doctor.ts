export interface Doctor {
  id: string;
  name: string;
  gender: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  location: string;
  nextSlot: string;
  fee: number;
  availableDates: string[];
  slots: Record<string, string[]>;
  about: string;
  doctorPhone?: string;
}
