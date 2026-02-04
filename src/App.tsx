import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import GoalsView from './components/GoalsView';
import CommunityView from './components/CommunityView';
import { useCarbonCalculator } from './hooks/useCarbonCalculator';
import { db } from './services/db';
import type { DigitalActivity } from './types/index';
import { BarChart3, X, CheckCircle2 } from 'lucide-react';

const INITIAL_ACTIVITY: DigitalActivity = {
  emailsPerDay: 25,
  streamingHoursPerDay: {
    sd: 1,
    hd: 2,
    ultra: 0,
  },
  cloudStorageGB: 100,
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [activity, setActivity] = useState<DigitalActivity>(() => {
    return db.getActivity() || INITIAL_ACTIVITY;
  });

  const impact = useCarbonCalculator(activity);

  useEffect(() => {
    db.saveActivity(activity);
  }, [activity]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveEarlyAccess(formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '' });
    }, 2000);
  };

  const renderContent = () => {
    if (!impact) {
      return (
        <div className="flex items-center justify-center p-20">
          <p className="text-xl text-carbon-400 animate-pulse">Initializing Eco-Tracker...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard impact={impact} activity={activity} setActivity={setActivity} />;
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 bg-blue-600/10 rounded-[2rem] flex items-center justify-center text-blue-400">
              <BarChart3 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-display tracking-tight">Advanced Analytics</h2>
              <p className="text-carbon-400 max-w-md mx-auto">
                Deeper historical insights and predictive carbon modeling are currently under development.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
            >
              Join Early Access
            </button>
          </div>
        );
      case 'goals':
        return <GoalsView impact={impact} />;
      case 'community':
        return <CommunityView />;
      default:
        return <div>Section coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/2 blur-[120px] rounded-full" />
      </div>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme}
        setTheme={setTheme}
      />
      
      <main className="pt-24 pb-12 px-8 relative z-10 max-w-[1700px] mx-auto min-h-[400px]">
        {renderContent()}
      </main>

      {/* Early Access Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="glass-dark w-full max-w-lg rounded-[2.5rem] p-10 border border-white/10 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-carbon-900/50 text-carbon-500 hover:text-carbon-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black">You're on the list!</h3>
                <p className="text-carbon-400">Thanks for joining our early access program. We'll be in touch soon.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black">Join Early Access</h3>
                  <p className="text-carbon-400 text-sm mt-1">Get exclusive access to advanced analytics features.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-carbon-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-carbon-900/50 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-carbon-500 uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-carbon-900/50 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all mt-4 shadow-lg shadow-blue-600/30"
                  >
                    Request Invitation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
