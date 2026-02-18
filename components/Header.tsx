
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-950 text-white shadow-2xl border-b border-blue-500/10 no-print">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-l from-white to-blue-400 bg-clip-text text-transparent">نظام اتحاد طلاب الشعيب</h1>
              <p className="text-blue-400/80 font-bold mt-1 uppercase tracking-wider text-xs">مكتب مندوب العوابل</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
            {['العوابل', 'المجزرة', 'ذي سكينة', '... والمزيد'].map((tag, i) => (
              <span key={i} className="bg-blue-500/5 px-4 py-2 rounded-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
