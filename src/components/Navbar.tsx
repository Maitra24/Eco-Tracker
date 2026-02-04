import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Moon, 
  Sun,
  User, 
  Search,
  CheckCircle2,
  Zap,
  Trophy,
  Info
} from 'lucide-react';
import { cn } from '../utils/cn';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, theme, setTheme }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'goals', label: 'Goals' },
    { id: 'community', label: 'Community' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Goal Achieved!',
      desc: 'You kept your emails under 20 today.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      time: 'Just now'
    },
    {
      id: 2,
      title: 'New Challenge',
      desc: 'Take the "SD-Only Weekend" challenge.',
      icon: Zap,
      color: 'text-yellow-500',
      time: '2h ago'
    },
    {
      id: 3,
      title: 'Top 10% Reached',
      desc: 'You are now a Community Leader!',
      icon: Trophy,
      color: 'text-blue-400',
      time: '1d ago'
    }
  ];

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
      <div className="max-w-[1700px] mx-auto glass rounded-2xl px-6 py-2 flex items-center justify-between border border-white/10 shadow-xl shadow-black/5 transition-all">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs italic">ET</span>
          </div>
          <span className="font-display font-black text-lg tracking-tight">EcoTracker</span>
        </div>

        {/* Dynamic Tabs */}
        <div className="flex items-center bg-carbon-900/50 rounded-xl p-1 border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-carbon-400 hover:text-carbon-50 hover:bg-carbon-900/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Utility Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative group">
            <Search className="absolute left-3 w-4 h-4 text-carbon-500 group-hover:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="bg-carbon-900/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-blue-500/50 w-32 focus:w-48 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 border-l border-white/10 pl-4 relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={cn(
                "p-2 transition-all rounded-lg relative group",
                isNotifOpen ? "bg-blue-600/10 text-blue-400" : "text-carbon-400 hover:text-carbon-50 hover:bg-carbon-900/50"
              )}
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-[var(--bg-main)] shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute top-full right-0 mt-4 w-80 bg-[var(--bg-main)]/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <h4 className="font-bold text-carbon-50">Notifications</h4>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">3 New</span>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 flex gap-4 hover:bg-carbon-900/30 transition-colors cursor-pointer border-b border-white/5 last:border-0 group">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-carbon-900/50", notif.color)}>
                        <notif.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-xs font-bold text-carbon-50">{notif.title}</p>
                          <span className="text-[8px] text-carbon-600 font-bold uppercase tracking-tighter">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-carbon-400 leading-snug">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-carbon-500 hover:text-blue-400 transition-colors bg-carbon-900/20 border-t border-white/5">
                  View All Activity
                </button>
              </div>
            )}
            
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 transition-all hover:bg-carbon-900/50 rounded-lg text-carbon-400 hover:text-carbon-50"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button className="ml-2 w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all overflow-hidden group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
