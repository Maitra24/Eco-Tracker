import React from 'react';
import { 
  Trophy, 
  Zap, 
  Users, 
  Target, 
  TreePine, 
  CloudRain, 
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn } from '../utils/cn';
import type { ActivityImpact } from '../types/index';

interface GoalsViewProps {
  impact: ActivityImpact;
}

const GoalsView: React.FC<GoalsViewProps> = ({ impact }) => {
  const goals = [
    {
      id: 1,
      title: 'Digital Minimalism',
      description: 'Keep daily emails below 20 for a week.',
      progress: 65,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 2,
      title: 'Streaming Diet',
      description: 'Switch 50% of 4K streaming to HD.',
      progress: 40,
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 3,
      title: 'Forest Guardian',
      description: 'Offset 100kg of CO2 through tree planting.',
      progress: Math.min((impact.totalImpact / 100) * 100, 100),
      icon: TreePine,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10'
    },
    {
      id: 4,
      title: 'Cloud Optimizer',
      description: 'Clean up 10GB of unused cloud storage.',
      progress: 20,
      icon: CloudRain,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-blue-600/20 rounded-[2rem] flex items-center justify-center text-blue-400 mx-auto">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black font-display tracking-tight text-carbon-50">Your Eco Goals</h2>
          <p className="text-carbon-400 max-w-lg mx-auto">
            Personalized challenges to help you shrink your digital footprint and earn badges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="glass-dark p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", goal.bgColor, goal.color)}>
                <goal.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-carbon-50">{Math.round(goal.progress)}%</span>
                <p className="text-[10px] text-carbon-500 font-bold uppercase tracking-widest">Complete</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-carbon-50 group-hover:text-blue-400 transition-colors">{goal.title}</h4>
                <p className="text-sm text-carbon-400">{goal.description}</p>
              </div>

              <div className="space-y-3">
                <div className="h-2 w-full bg-carbon-800 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", goal.id === 3 ? "bg-emerald-400" : "bg-blue-600")}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-carbon-500 uppercase tracking-tighter">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4 days left</span>
                  <button className="flex items-center gap-1 text-carbon-50 hover:text-blue-400 transition-colors">
                    View Tasks <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className={cn(
              "absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] rounded-full opacity-20",
              goal.bgColor.replace('/10', '')
            )} />
          </div>
        ))}
      </div>

      <div className="glass-dark p-10 rounded-[3rem] border border-blue-600/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/40">
            <Users className="w-8 h-8" />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-xl font-bold text-carbon-50">Community Leaderboard Challenge</h3>
            <p className="text-carbon-400 text-sm">You are in the <span className="text-blue-400 font-bold">top 12%</span> of eco-conscious users. Can you reach the top 10% by the end of the month?</p>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform">
            See Ranking
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsView;
