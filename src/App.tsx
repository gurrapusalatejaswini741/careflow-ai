import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { FindDoctor } from './pages/FindDoctor';
import { DoctorDetails } from './pages/DoctorDetails';
import { Services } from './pages/Services';
import { Hospitals } from './pages/Hospitals';
import { MyAppointments } from './pages/MyAppointments';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { useDoctors } from './hooks/useDoctors';
import { useAppointments } from './hooks/useAppointments';
import { Doctor } from './types/doctor';
import { AIInterpretationResult } from './services/aiService';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Aarav Patel',
    email: 'aarav.patel@example.com'
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingSlotData, setBookingSlotData] = useState<{ doctor: Doctor; date: string; slot: string } | null>(null);
  const [filterPreferences, setFilterPreferences] = useState<AIInterpretationResult | null>(null);

  const { doctors } = useDoctors();
  const { appointments, addAppointment, changeStatus } = useAppointments();

  const handleApplySearchPreferences = (pref: AIInterpretationResult) => {
    setFilterPreferences(pref);
    setCurrentTab('doctors');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 antialiased">
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        user={user} 
        onSignOut={() => setUser(null)} 
      />

      <main className="flex-1 flex flex-col">
        {currentTab === 'home' && (
          <Home 
            setCurrentTab={setCurrentTab} 
            onApplySearchPreferences={handleApplySearchPreferences} 
          />
        )}

        {currentTab === 'doctors' && (
          <FindDoctor 
            doctors={doctors} 
            initialFilters={filterPreferences} 
            onSelectDoctor={(doc) => {
              setSelectedDoctor(doc);
              setCurrentTab('doctor-detail');
            }} 
          />
        )}

        {currentTab === 'doctor-detail' && selectedDoctor && (
          <DoctorDetails 
            doctor={selectedDoctor} 
            onBack={() => setCurrentTab('doctors')} 
            onProceedBooking={(doc, date, slot) => {
              setBookingSlotData({ doctor: doc, date, slot });
              setCurrentTab('booking-confirm');
            }} 
          />
        )}

        {currentTab === 'booking-confirm' && bookingSlotData && (
          <BookingConfirmation 
            doctor={bookingSlotData.doctor}
            date={bookingSlotData.date}
            slot={bookingSlotData.slot}
            onBack={() => setCurrentTab('doctor-detail')}
            onSuccess={async (newApp) => {
              await addAppointment(newApp);
            }}
          />
        )}

        {currentTab === 'appointments' && (
          <MyAppointments 
            appointments={appointments}
            onCancel={(id) => changeStatus(id, 'Cancelled')}
            onReschedule={(app) => {
              const doc = doctors.find((d) => d.name === app.doctorName) || doctors[0];
              setSelectedDoctor(doc);
              setCurrentTab('doctor-detail');
            }}
          />
        )}

        {currentTab === 'hospitals' && (
          <Hospitals setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'services' && (
          <Services setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'signin' && (
          <div className="max-w-md mx-auto px-4 py-16 flex-1 w-full flex items-center justify-center">
            <div className="bg-white w-full rounded-3xl border border-slate-200 p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl shadow-md">
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Sign In to CareFlow AI</h2>
                <p className="text-sm text-slate-500 mt-1">Access appointments & smart waitlists</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setUser({ name: 'Aarav Patel', email: 'aarav.patel@example.com' }); setCurrentTab('home'); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" defaultValue="Aarav Patel" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" defaultValue="aarav.patel@example.com" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all mt-2">
                  Sign In / Register
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;