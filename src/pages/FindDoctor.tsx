import React, { useEffect, useMemo, useState } from 'react';
import { Doctor } from '../types/doctor';
import { DoctorCard } from '../components/DoctorCard';

interface FindDoctorProps {
  doctors: Doctor[];
  initialFilters: {
    specialty?: string;
    gender?: string;
    language?: string;
  } | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

const normalizeSpecialty = (value?: string) => {
  const v = (value || '').toLowerCase().trim();

  if (
    v === 'orthopaedics' ||
    v === 'orthopedic' ||
    v === 'orthopedics'
  ) {
    return 'Orthopedics';
  }

  if (v === 'dermatology' || v === 'skin') {
    return 'Dermatology';
  }

  if (v === 'pediatrics' || v === 'paediatrics' || v === 'children') {
    return 'Pediatrics';
  }

  if (v === 'cardiology' || v === 'heart') {
    return 'Cardiology';
  }

  if (v === 'dentistry' || v === 'dental' || v === 'teeth') {
    return 'Dentistry';
  }

  if (v === 'ophthalmology' || v === 'eye' || v === 'eyes') {
    return 'Ophthalmology';
  }

  if (v === 'ent' || v === 'ear nose throat') {
    return 'ENT';
  }

  if (v === 'neurology' || v === 'neurologist') {
    return 'Neurology';
  }

  if (v === 'gynecology' || v === 'gynaecology') {
    return 'Gynecology';
  }

  if (
    v === 'general medicine' ||
    v === 'general physician' ||
    v === 'general doctor'
  ) {
    return 'General Medicine';
  }

  return value || 'All';
};

export const FindDoctor: React.FC<FindDoctorProps> = ({
  doctors,
  initialFilters,
  onSelectDoctor
}) => {
  const [searchName, setSearchName] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    normalizeSpecialty(initialFilters?.specialty)
  );
  const [selectedGender, setSelectedGender] = useState(
    initialFilters?.gender || 'All'
  );
  const [selectedHospital, setSelectedHospital] = useState('All');

  const specialties = [
    'All',
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

  const genders = ['All', 'Female', 'Male'];

  const hospitalsList = useMemo(() => {
    const hospitals = Array.from(
      new Set(doctors.map((doctor) => doctor.hospital).filter(Boolean))
    );

    return ['All', ...hospitals];
  }, [doctors]);

  // IMPORTANT:
  // When AI sends new filters, update the visible filters.
  useEffect(() => {
    setSelectedSpecialty(
      normalizeSpecialty(initialFilters?.specialty)
    );

    setSelectedGender(
      initialFilters?.gender || 'All'
    );

    setSearchName('');
    setSelectedHospital('All');
  }, [initialFilters]);

  const filteredDoctors = doctors.filter((doc) => {
    const search = searchName.toLowerCase().trim();

    const matchesName =
      !search ||
      doc.name.toLowerCase().includes(search) ||
      doc.specialty.toLowerCase().includes(search) ||
      doc.hospital.toLowerCase().includes(search);

    const normalizedDoctorSpecialty =
      normalizeSpecialty(doc.specialty);

    const normalizedSelectedSpecialty =
      normalizeSpecialty(selectedSpecialty);

    const matchesSpecialty =
      normalizedSelectedSpecialty === 'All' ||
      normalizedDoctorSpecialty === normalizedSelectedSpecialty;

    const matchesGender =
      selectedGender === 'All' ||
      doc.gender === selectedGender;

    const matchesHospital =
      selectedHospital === 'All' ||
      doc.hospital === selectedHospital;

    return (
      matchesName &&
      matchesSpecialty &&
      matchesGender &&
      matchesHospital
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Find Qualified Doctors
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Browse specialties, check credentials, and book verified time slots.
          </p>

          {initialFilters?.language && (
            <p className="text-xs text-teal-600 mt-2 font-medium">
              AI understood your request in {initialFilters.language}.
            </p>
          )}
        </div>

        <div className="mt-4 md:mt-0 relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>

          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search doctor or specialty..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 h-fit space-y-6">

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              Filters
            </h3>

            <button
              type="button"
              onClick={() => {
                setSelectedSpecialty('All');
                setSelectedGender('All');
                setSelectedHospital('All');
                setSearchName('');
              }}
              className="text-xs text-teal-600 font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* SPECIALTY */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Specialty
            </label>

            <div className="space-y-1">
              {specialties.map((spec) => (
                <button
                  type="button"
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedSpecialty === spec
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Doctor Gender
            </label>

            <div className="space-y-1">
              {genders.map((gender) => (
                <button
                  type="button"
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedGender === gender
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* HOSPITAL */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Hospital
            </label>

            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {hospitalsList.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DOCTORS */}
        <div className="lg:col-span-3 space-y-4">

          {filteredDoctors.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">

              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4 text-xl">
                <i className="fa-solid fa-user-doctor"></i>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1">
                No doctors match your filters
              </h3>

              <p className="text-sm text-slate-500">
                Try adjusting your specialty or gender preferences.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedSpecialty('All');
                  setSelectedGender('All');
                  setSelectedHospital('All');
                  setSearchName('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700"
              >
                Show All Doctors
              </button>

            </div>
          ) : (

            <>
              <div className="text-sm text-slate-500 mb-2">
                Showing{' '}
                <span className="font-semibold text-slate-800">
                  {filteredDoctors.length}
                </span>{' '}
                doctor{filteredDoctors.length !== 1 ? 's' : ''}
                {selectedSpecialty !== 'All' && (
                  <>
                    {' '}for{' '}
                    <span className="font-semibold text-teal-700">
                      {selectedSpecialty}
                    </span>
                  </>
                )}
              </div>

              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBook={onSelectDoctor}
                />
              ))}
            </>
          )}

        </div>
      </div>
    </div>
  );
};