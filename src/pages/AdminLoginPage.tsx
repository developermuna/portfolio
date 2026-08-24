import { useState } from 'react';
import { login } from '../utils/dataStore';
import FadeIn from '../components/FadeIn';
import { ArrowLeft, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

const AdminLoginPage = ({ onLoginSuccess }: AdminLoginPageProps) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    if (login(id, password)) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid Admin ID or Password');
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#home';
  };

  const inputClass = "w-full bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors";
  const labelClass = "block text-[#D7E2EA]/70 text-sm font-medium mb-2 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] flex items-center justify-center p-6 relative z-50">
      <div className="max-w-md w-full">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium uppercase tracking-widest text-sm">Return Home</span>
        </button>

        <FadeIn delay={0.1}>
          <div className="bg-[#111111] border border-[#D7E2EA]/10 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center">
            
            <div className="w-16 h-16 bg-[#D7E2EA]/10 text-[#D7E2EA] rounded-full flex items-center justify-center mb-6">
              <Lock size={32} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
              Admin Login
            </h1>
            <p className="text-[#D7E2EA]/50 font-light mb-8">
              Enter your credentials to access the dashboard.
            </p>

            {error && (
              <div className="w-full mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-medium text-left">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 text-left">
              <div>
                <label className={labelClass}>Admin ID</label>
                <input 
                  name="id" 
                  required 
                  type="text" 
                  placeholder="Enter ID" 
                  className={inputClass} 
                />
              </div>
              
              <div>
                <label className={labelClass}>Password</label>
                <input 
                  name="password" 
                  required 
                  type="password" 
                  placeholder="Enter Password" 
                  className={inputClass} 
                />
              </div>

              <button 
                type="submit" 
                className="mt-4 w-full bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors"
              >
                Sign In
              </button>
            </form>

          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default AdminLoginPage;
