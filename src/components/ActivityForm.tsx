import React from 'react';
import { Mail, Monitor, Database, Save } from 'lucide-react';
import type { DigitalActivity } from '../types/index';
import { cn } from '../utils/cn';

interface ActivityFormProps {
  activity: DigitalActivity;
  setActivity: React.Dispatch<React.SetStateAction<DigitalActivity>>;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, setActivity }) => {
  const handleSliderChange = (field: string, value: number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setActivity(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DigitalActivity] as any),
          [child]: value
        }
      }));
    } else {
      setActivity(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-carbon-50 mb-2">Track Activity</h2>
        <p className="text-carbon-400">Update your daily digital habits to recalculate your impact.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Activity */}
        <div className="glass-dark rounded-[2rem] p-8 border-eco-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-eco-500/20 flex items-center justify-center text-eco-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Email Activity</h4>
              <p className="text-carbon-500 text-sm">Sent & Received daily</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-carbon-300 font-medium">Emails per Day</span>
                <span className="text-eco-400 font-bold">{activity.emailsPerDay}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={activity.emailsPerDay}
                onChange={(e) => handleSliderChange('emailsPerDay', parseInt(e.target.value))}
                className="w-full h-1.5 bg-carbon-800 rounded-lg appearance-none cursor-pointer accent-eco-500 hover:accent-eco-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-500/50"
              />
              <div className="flex justify-between text-xs text-carbon-600 uppercase tracking-widest font-bold">
                <span>0</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Storage */}
        <div className="glass-dark rounded-[2rem] p-8 border-eco-500/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-eco-500/20 flex items-center justify-center text-eco-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Cloud Storage</h4>
              <p className="text-carbon-500 text-sm">Total GB stored</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-carbon-300 font-medium">Total Usage (GB)</span>
                <span className="text-eco-400 font-bold">{activity.cloudStorageGB} GB</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={activity.cloudStorageGB}
                onChange={(e) => handleSliderChange('cloudStorageGB', parseInt(e.target.value))}
                className="w-full h-1.5 bg-carbon-800 rounded-lg appearance-none cursor-pointer accent-eco-500 hover:accent-eco-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-500/50"
              />
              <div className="flex justify-between text-xs text-carbon-600 uppercase tracking-widest font-bold">
                <span>0</span>
                <span>1TB</span>
                <span>2TB+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Streaming */}
        <div className="md:col-span-2 glass-dark rounded-[2rem] p-8 border-eco-500/10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-eco-500/20 flex items-center justify-center text-eco-400">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Media Streaming</h4>
              <p className="text-carbon-500 text-sm">Hours per day by quality</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Standard (SD)', field: 'streamingHoursPerDay.sd', max: 24, color: 'accent-eco-400' },
              { label: 'High (HD)', field: 'streamingHoursPerDay.hd', max: 24, color: 'accent-eco-500' },
              { label: 'Ultra (4K)', field: 'streamingHoursPerDay.ultra', max: 24, color: 'accent-eco-600' },
            ].map((item) => (
              <div key={item.field} className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-carbon-300 font-medium">{item.label}</span>
                  <span className="text-carbon-50 font-bold">
                    {(activity.streamingHoursPerDay as any)[item.field.split('.')[1]]}h
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={item.max}
                  step="0.5"
                  value={(activity.streamingHoursPerDay as any)[item.field.split('.')[1]]}
                  onChange={(e) => handleSliderChange(item.field, parseFloat(e.target.value))}
                  className={cn(
                    "w-full h-1.5 bg-carbon-800 rounded-lg appearance-none cursor-pointer accent-eco-500",
                    "hover:accent-eco-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-500/50"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-8 py-4 bg-eco-500 hover:bg-eco-600 text-carbon-50 font-bold rounded-2xl transition-all shadow-lg shadow-eco-500/20 hover:shadow-eco-500/40 transform hover:-translate-y-1 active:translate-y-0">
          <Save className="w-5 h-5" />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default ActivityForm;
