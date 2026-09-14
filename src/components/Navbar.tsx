import React, { useState } from 'react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: { name: string; email: string } | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, user, onSignOut }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setCurrentTab('home')}
            aria-label="CareFlow AI Home"
          >
            <div className="w-11 h-11 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors">
              <i className="fa-solid fa-heart-pulse text-xl"></i>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">CareFlow <span className="text-teal-600">AI</span></span>
              <span className="block text-xs font-medium text-slate-500">Intelligent Care Navigation</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
            <button 
              onClick={() => setCurrentTab('home')} 
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${currentTab === 'home' ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentTab('doctors')} 
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${currentTab === 'doctors' ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Find Doctor
            </button>
            <button 
              onClick={() => setCurrentTab('hospitals')} 
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${currentTab === 'hospitals' ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Hospitals
            </button>
            <button 
              onClick={() => setCurrentTab('services')} 
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${currentTab === 'services' ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setCurrentTab('appointments')} 
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${currentTab === 'appointments' ? 'text-teal-700 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              My Appointments
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-semibold flex items-center justify-center text-sm">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
                <button onClick={onSignOut} className="text-xs text-slate-400 hover:text-red-600 ml-2" title="Sign Out">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentTab('signin')} 
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-teal-600/20"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          <button onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">Home</button>
          <button onClick={() => { setCurrentTab('doctors'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">Find Doctor</button>
          <button onClick={() => { setCurrentTab('hospitals'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">Hospitals</button>
          <button onClick={() => { setCurrentTab('services'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">Services</button>
          <button onClick={() => { setCurrentTab('appointments'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700">My Appointments</button>
          <div className="pt-2 border-t border-slate-200">
            <button onClick={() => { setCurrentTab('signin'); setMobileMenuOpen(false); }} className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-medium text-center">Sign In</button>
          </div>
        </div>
      )}
    </header>
  );
};