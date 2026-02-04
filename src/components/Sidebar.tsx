import React from 'react';
import { LayoutDashboard, Leaf, Activity, Settings, HelpCircle, BarChart3 } from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'offsets', icon: Leaf, label: 'Offsets' },
    { id: 'stats', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="h-screen w-64 bg-carbon-950/50 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-eco-400 to-eco-600 rounded-xl flex items-center justify-center shadow-lg shadow-eco-500/20">
          <Leaf className="text-carbon-50 w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tracking-tight">
            EcoTracker
          </h1>
          <p className="text-[10px] text-eco-500 font-bold tracking-[0.2em] uppercase">Digital Impact</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-eco-500/10 text-eco-400" 
                : "text-carbon-400 hover:bg-carbon-900/50 hover:text-carbon-100"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeTab === item.id ? "text-eco-400" : "text-carbon-500 group-hover:text-carbon-300"
            )} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-eco-500 shadow-glow" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-carbon-400 hover:bg-carbon-900/50 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-carbon-400 hover:bg-carbon-900/50 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
