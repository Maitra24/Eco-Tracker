import React from 'react';
import { TreePine, Wind, Sun, Droplets, CheckCircle2 } from 'lucide-react';
import type { OffsetSolution } from '../types/index';

interface OffsetMarketProps {
  totalCarbon: number;
}

const OFFSETS: OffsetSolution[] = [
  {
    id: '1',
    title: 'Reforestation Project',
    description: 'Planting native trees in the Amazon rainforest to restore biodiversity.',
    carbonReduction: 50, // per tree
    costPerKg: 0.15,
    icon: 'TreePine',
  },
  {
    id: '2',
    title: 'Wind Farm Initiative',
    description: 'Supporting the construction of wind turbines in coastal regions.',
    carbonReduction: 500, // per share
    costPerKg: 0.08,
    icon: 'Wind',
  },
  {
    id: '3',
    title: 'Solar Community',
    description: 'Funding solar panel installations for low-income communities.',
    carbonReduction: 300,
    costPerKg: 0.12,
    icon: 'Sun',
  },
  {
    id: '4',
    title: 'Ocean Cleanup',
    description: 'Removing plastic waste from oceans to improve marine health.',
    carbonReduction: 100,
    costPerKg: 0.20,
    icon: 'Droplets',
  }
];

const iconMap: Record<string, any> = {
  TreePine,
  Wind,
  Sun,
  Droplets
};

const OffsetMarket: React.FC<OffsetMarketProps> = ({ totalCarbon }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-carbon-50 mb-2">Offset Market</h2>
          <p className="text-carbon-400">Neutralize your carbon footprint by supporting green initiatives.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-carbon-500 uppercase font-black">Target to Neutralize</p>
          <p className="text-2xl font-bold text-eco-400">{totalCarbon.toFixed(1)} kg CO₂e</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OFFSETS.map((offset) => {
          const Icon = iconMap[offset.icon];
          const fullOffsetCost = (totalCarbon * offset.costPerKg).toFixed(2);
          
          return (
            <div key={offset.id} className="glass-dark rounded-[2rem] p-8 border border-white/5 hover:border-eco-500/30 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-eco-500/10 flex items-center justify-center text-eco-400 group-hover:bg-eco-500 group-hover:text-carbon-50 transition-all duration-500">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="bg-carbon-900/50 px-3 py-1 rounded-full border border-white/5 text-[10px] font-bold text-carbon-400 uppercase tracking-widest">
                  Verified Project
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-carbon-50 mb-2">{offset.title}</h3>
              <p className="text-carbon-400 text-sm leading-relaxed mb-8">
                {offset.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-carbon-900/50 border border-white/5">
                  <p className="text-[10px] text-carbon-500 uppercase font-bold mb-1">Efficiency</p>
                  <p className="text-lg font-bold text-carbon-50">-{offset.carbonReduction}kg</p>
                </div>
                <div className="p-4 rounded-2xl bg-carbon-900/50 border border-white/5">
                  <p className="text-[10px] text-carbon-500 uppercase font-bold mb-1">Cost Rate</p>
                  <p className="text-lg font-bold text-carbon-50">${offset.costPerKg}/kg</p>
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-carbon-900/50 hover:bg-eco-500 text-carbon-50 font-bold transition-all border border-white/10 hover:border-eco-500 flex items-center justify-center gap-2 group/btn">
                <span>Offset Entire Footprint for ${fullOffsetCost}</span>
                <CheckCircle2 className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffsetMarket;
