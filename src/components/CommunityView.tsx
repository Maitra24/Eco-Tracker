import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Globe, 
  TreePine, 
  Zap, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '../utils/cn';

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
    impact: string;
  };
  content: string;
  type: 'offset' | 'achievement' | 'stat';
  likes: number;
  comments: number;
  time: string;
}

const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'SC',
      level: 'Diamond Guardian',
      impact: '1.2t Saved'
    },
    content: "Just reached my goal of 30 days without 4K streaming! The difference in my digital footprint is massive. 🌿",
    type: 'achievement',
    likes: 124,
    comments: 12,
    time: '2h ago'
  },
  {
    id: '2',
    user: {
      name: 'Marcus Miller',
      avatar: 'MM',
      level: 'Eco Architect',
      impact: '850kg Saved'
    },
    content: "Started a team challenge at work to reduce email attachments. We've collectively saved an estimated 45kg CO2 this week alone!",
    type: 'offset',
    likes: 89,
    comments: 5,
    time: '5h ago'
  },
  {
    id: '3',
    user: {
      name: 'Elena Rodriguez',
      avatar: 'ER',
      level: 'Forest Friend',
      impact: '2.4t Saved'
    },
    content: "New research shows that clearing 1GB of cloud storage can save as much energy as charging a smartphone 50 times. Time for some spring cleaning! ☁️",
    type: 'stat',
    likes: 215,
    comments: 48,
    time: '1d ago'
  }
];

const CommunityView: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Stats & Profile */}
      <div className="space-y-6">
        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                ME
              </div>
              <div>
                <h3 className="text-xl font-bold text-carbon-50">Your Profile</h3>
                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Master Neutralizer</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-carbon-900/50 p-4 rounded-2xl">
                <span className="text-[10px] text-carbon-500 font-bold uppercase tracking-widest block mb-1">Global Rank</span>
                <span className="text-lg font-black text-carbon-50">#1,284</span>
              </div>
              <div className="bg-carbon-900/50 p-4 rounded-2xl">
                <span className="text-[10px] text-carbon-500 font-bold uppercase tracking-widest block mb-1">Reputation</span>
                <span className="text-lg font-black text-carbon-50">4.8k</span>
              </div>
            </div>

            <button className="w-full py-4 bg-carbon-900/50 hover:bg-white/10 rounded-2xl border border-white/10 text-carbon-50 font-bold transition-all flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              View Credentials
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
        </div>

        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
          <h4 className="text-sm font-bold text-carbon-400 uppercase tracking-widest mb-6">Trending Challenges</h4>
          <div className="space-y-4">
            <ChallengeItem title="Inbox Zero Week" participants="12.4k" color="text-yellow-500" />
            <ChallengeItem title="SD-Only Weekend" participants="4.2k" color="text-blue-400" />
            <ChallengeItem title="Cloud De-Clutter" participants="28k" color="text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Center Column: Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-500" />
            <input 
              type="text" 
              placeholder="Search community news..." 
              className="w-full bg-carbon-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-carbon-50 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'achievement', 'offset'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeFilter === filter 
                    ? "bg-blue-600 text-white" 
                    : "bg-carbon-900/50 text-carbon-500 hover:text-carbon-50"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.filter(p => activeFilter === 'all' || p.type === activeFilter).map((post) => (
            <div key={post.id} className="glass-dark rounded-[2.5rem] p-8 border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-carbon-800 rounded-xl flex items-center justify-center text-carbon-50 font-bold group-hover:bg-blue-600 transition-colors">
                    {post.user.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-carbon-50 flex items-center gap-2">
                      {post.user.name}
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow animate-pulse" />
                    </h5>
                    <p className="text-[10px] text-carbon-500 font-bold uppercase tracking-tighter">
                      {post.user.level} • <span className="text-blue-400">{post.user.impact}</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs text-carbon-600 font-medium">{post.time}</span>
              </div>

              <p className="text-carbon-300 leading-relaxed mb-8">
                {post.content}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 text-carbon-500 hover:text-rose-400 transition-colors group/btn"
                  >
                    <Heart className="w-4 h-4 group-active/btn:scale-150 transition-transform" />
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-carbon-500 hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-bold">{post.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-carbon-500 hover:text-carbon-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChallengeItem = ({ title, participants, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-carbon-900/50 rounded-2xl border border-transparent hover:border-white/10 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className={cn("w-2 h-2 rounded-full", color.replace('text', 'bg'))} />
      <span className="text-sm font-bold text-carbon-50 group-hover:translate-x-1 transition-transform">{title}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-black text-carbon-400">{participants}</span>
      <p className="text-[8px] text-carbon-600 font-bold uppercase tracking-widest">Active</p>
    </div>
  </div>
);

export default CommunityView;
