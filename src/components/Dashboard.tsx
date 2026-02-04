import React from 'react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  AreaChart, 
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  Mail, 
  Monitor, 
  RefreshCcw, 
  CheckCircle2, 
  Trophy, 
  Cloud, 
  Zap, 
  Bell, 
  ArrowUp, 
  ArrowDown,
  BarChart3,
  PieChart
} from 'lucide-react';
import type { ActivityImpact, DigitalActivity } from '../types/index';
import { cn } from '../utils/cn';

interface DashboardProps {
  impact: ActivityImpact;
  activity: DigitalActivity;
  setActivity: React.Dispatch<React.SetStateAction<DigitalActivity>>;
}

const sparklineData = [
  { value: 12 }, { value: 15 }, { value: 13 }, { value: 16 }, 
  { value: 14 }, { value: 11 }, { value: 12.8 }
];

const Dashboard: React.FC<DashboardProps> = ({ impact, activity, setActivity }) => {
  const [chartType, setChartType] = React.useState<'pie' | 'bar'>('pie');
  
  const chartData = [
    { name: 'Streaming', value: impact.streamingImpact || 0, color: '#2563eb' },
    { name: 'Emails', value: impact.emailImpact || 0, color: '#f59e0b' },
    { name: 'Cloud Storage', value: impact.storageImpact || 0, color: '#10b981' },
  ];

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
    <div className="space-y-6">
      {/* Top row: Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          id="co2"
          icon={Cloud} 
          title="Monthly CO2e" 
          value={`${(impact.totalImpact || 0).toFixed(1)} kg`}
          subtitle="Carbon dioxide equivalent"
          change="-12%"
          isNegative={true}
          data={sparklineData}
          color="#3b82f6"
        />
        <MetricCard 
          id="waste"
          icon={Zap} 
          title="Digital Waste Score" 
          value="64/100"
          subtitle="Lower is better"
          change="+8%"
          isNegative={false}
          data={[...sparklineData].reverse()}
          color="#3b82f6"
        />
        <MetricCard 
          id="trees"
          icon={Bell} 
          title="Trees to Offset" 
          value={Math.ceil((impact.totalImpact || 0) / 50).toString()}
          subtitle="Trees planted yearly"
          change="+2"
          isNegative={false}
          data={sparklineData}
          color="#3b82f6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Command Center */}
        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-xl font-bold font-display px-2">Input Command Center</h4>
            <button className="p-2 hover:bg-carbon-900/50 rounded-full transition-colors opacity-50">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-12">
            <ControlSlider 
              icon={Monitor}
              label="Hours Streammed (4K)"
              description="Video streaming consumption"
              value={activity.streamingHoursPerDay.ultra}
              onChange={(v: number) => handleSliderChange('streamingHoursPerDay.ultra', v)}
              min={0}
              max={100}
              unit="hrs"
            />
            <ControlSlider 
              icon={Mail}
              label="Emails Sent"
              description="Including attachments"
              value={activity.emailsPerDay}
              onChange={(v: number) => handleSliderChange('emailsPerDay', v)}
              min={0}
              max={1000}
              unit=""
            />
            <ControlSlider 
              icon={Cloud}
              label="Cloud Storage Used"
              description="Active storage in GB"
              value={activity.cloudStorageGB}
              onChange={(v: number) => handleSliderChange('cloudStorageGB', v)}
              min={0}
              max={1000}
              unit="GB"
            />
          </div>
        </div>

        {/* Carbon Breakdown Breakdown */}
        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold font-display px-2">Carbon Breakdown</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => setChartType('pie')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  chartType === 'pie' ? "bg-blue-600 text-white" : "bg-carbon-900/50 text-carbon-400 hover:text-carbon-50"
                )}
              >
                <PieChart className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setChartType('bar')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  chartType === 'bar' ? "bg-blue-600 text-white" : "bg-carbon-900/50 text-carbon-400 hover:text-carbon-50"
                )}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="h-[280px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'pie' ? (
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                  </RechartsPieChart>
                ) : (
                  <RechartsBarChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--carbon-500)', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--carbon-500)', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'var(--glass-border)' }}
                      contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                )}
              </ResponsiveContainer>
              {chartType === 'pie' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-carbon-50">{(impact.totalImpact || 0).toFixed(2)}</span>
                  <span className="text-xs text-carbon-500 font-bold tracking-tight">kg CO2e Total</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-carbon-400 group-hover:text-carbon-50 transition-colors">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-carbon-50 transition-transform group-hover:scale-110">
                    {(item.value || 0).toFixed(2)} kg
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zero-Waste Challenge */}
        <div className="glass-dark rounded-[2rem] p-8 border border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-display leading-tight">Zero-Waste Week Challenge</h4>
              <p className="text-carbon-500 text-xs">Reduce your footprint for 7 consecutive days</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-carbon-400 uppercase tracking-widest">Progress</span>
                <span className="text-xs font-bold text-carbon-50 italic">5/7 days</span>
              </div>
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 0, 0].map((day, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 h-3 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-105",
                      day ? "bg-blue-600" : "bg-carbon-800"
                    )}
                  >
                    {day === 5 && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-carbon-400 uppercase tracking-widest">Milestones</span>
              <div className="grid grid-cols-2 gap-3">
                <MilestoneCard label="First Step" sub="10 kg saved" active={true} />
                <MilestoneCard label="Eco Aware" sub="25 kg saved" active={true} />
                <MilestoneCard label="Green Starter" sub="50 kg saved" active={false} />
                <MilestoneCard label="Planet Friend" sub="100 kg saved" active={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass-dark rounded-[2rem] p-8 border border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-display leading-tight">Community Leaderboard</h4>
              <p className="text-carbon-500 text-xs">Top eco-conscious users this month</p>
            </div>
          </div>

          <div className="space-y-3">
            <LeaderboardRow rank={1} name="EcoWarrior22" points="2440" isUser={false} />
            <LeaderboardRow rank={2} name="GreenLeaf" points="2180" isUser={false} />
            <LeaderboardRow rank={3} name="NatureFirst" points="1920" isUser={false} />
            <LeaderboardRow rank={4} name="You" points="1840" isUser={true} />
            <LeaderboardRow rank={5} name="TreeHugger" points="1480" isUser={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const MetricCard = ({ id, icon: Icon, title, value, subtitle, change, isNegative, data, color }: any) => (
  <div className="glass-dark rounded-[2rem] p-6 border border-white/5 group hover:border-blue-600/30 transition-all duration-500 overflow-hidden relative">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
        isNegative ? "text-blue-400 bg-blue-400/10" : "text-red-400 bg-red-400/10"
      )}>
        {isNegative ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
        {change}
      </div>
    </div>
    
    <div className="mb-4">
      <p className="text-carbon-400 text-[10px] font-black uppercase tracking-[0.1em] mb-1">{title}</p>
      <h3 className="text-2xl font-black text-carbon-50 tracking-tight">{value}</h3>
      <p className="text-carbon-600 text-[10px] uppercase font-bold tracking-tighter">{subtitle}</p>
    </div>

    <div className="h-12 w-full mt-2 -mx-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#grad-${id})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ControlSlider = ({ icon: Icon, label, description, value, onChange, min, max, unit }: any) => (
  <div className="group">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-carbon-900/50 rounded-xl flex items-center justify-center text-carbon-400 group-hover:text-blue-400 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h5 className="text-sm font-bold text-carbon-50 group-hover:translate-x-1 transition-transform">{label}</h5>
          <p className="text-[10px] text-carbon-500 uppercase tracking-widest font-medium">{description}</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-carbon-900/50 rounded-full border border-white/5">
        <span className="text-sm font-black text-carbon-50">{value}</span>
      </div>
    </div>
    <div className="px-2">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 bg-carbon-800 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
      />
      <div className="flex justify-between mt-2 text-[10px] text-carbon-600 font-bold uppercase tracking-tight">
        <span>{min} {unit}</span>
        <span>{max/2} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  </div>
);

const MilestoneCard = ({ label, sub, active }: any) => (
  <div className={cn(
    "p-3 rounded-xl border flex items-center gap-3 transition-all duration-300",
    active 
      ? "bg-blue-600/10 border-blue-600/20 text-blue-400" 
      : "bg-carbon-900/50 border-white/5 text-carbon-600 opacity-50"
  )}>
    <div className={cn(
      "w-6 h-6 rounded-full flex items-center justify-center",
      active ? "bg-blue-600 text-carbon-50" : "bg-carbon-800 text-carbon-600"
    )}>
      {active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Trophy className="w-3.5 h-3.5" />}
    </div>
    <div>
      <p className="text-[11px] font-bold leading-none mb-1">{label}</p>
      <p className="text-[9px] opacity-70 uppercase tracking-tighter">{sub}</p>
    </div>
  </div>
);

const LeaderboardRow = ({ rank, name, points, isUser }: any) => (
  <div className={cn(
    "flex items-center justify-between p-3 rounded-xl transition-all hover:bg-carbon-900/50 border border-transparent",
    isUser && "bg-blue-600/10 border-blue-600/20 shadow-lg shadow-blue-600/5"
  )}>
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black italic",
        rank === 1 ? "bg-yellow-500/20 text-yellow-500" :
        rank === 2 ? "bg-slate-400/20 text-slate-400" :
        rank === 3 ? "bg-amber-700/20 text-amber-700" : "bg-carbon-900/50 text-carbon-500"
      )}>
        {rank}
      </div>
      <span className={cn("text-xs font-bold", isUser ? "text-blue-400" : "text-carbon-50")}>{name}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-black text-carbon-50 italic">{points}</span>
      <span className="text-[9px] text-carbon-500 uppercase font-bold tracking-tighter">pts</span>
      {isUser && <span className="ml-4 text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-black uppercase italic tracking-tighter">You</span>}
    </div>
  </div>
);

export default Dashboard;
