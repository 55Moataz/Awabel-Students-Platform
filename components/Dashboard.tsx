
import React, { useState } from 'react';
import { Student } from '../types';

interface DashboardProps {
  students: Student[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, onDelete, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = students.filter(s => 
    s.fullName.includes(searchTerm) || 
    s.village.includes(searchTerm) || 
    s.major.includes(searchTerm)
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportWhatsApp = () => {
    if (students.length === 0) {
      alert("لا توجد بيانات لتصديرها.");
      return;
    }

    let message = `📋 كشف الطلاب المسجلين - مكتب مندوب العوابل\n`;
    message += `-----------------------------------\n`;
    
    students.forEach((s, index) => {
      message += `${index + 1}. 👤 ${s.fullName}\n   🏠 القرية: ${s.village}\n   🎓 التخصص: ${s.major}\n   🏫 ${s.university}\n`;
      message += `-----------------------------------\n`;
    });

    message += `\n📊 إجمالي الطلاب: ${students.length}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/967772328164?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadText = () => {
    if (students.length === 0) return;
    
    let content = `كشف طلاب العوابل - اتحاد الشعيب\n\n`;
    students.forEach((s, i) => {
      content += `${i + 1}. ${s.fullName} - ${s.village} - ${s.major} - ${s.university}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `كشف_الطلاب_${new Date().toLocaleDateString('ar-YE')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></span>
            سجل الطلاب المركزي
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            عدد الطلاب المقيدين: <span className="text-blue-400 font-black text-xl">{students.length}</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleExportWhatsApp}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-blue-400/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.82 11.82 0 001.611 5.973L0 24l6.117-1.605a11.745 11.745 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.05.002-3.213-1.252-6.234-3.532-8.513"/>
            </svg>
            تصدير للواتساب
          </button>
          
          <button 
            onClick={handlePrint}
            className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-slate-700"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 02 2 2zm0 0v-8a2 2 0 012-2h6a2 2 0 012 2v8" />
            </svg>
            طباعة الكشف
          </button>

          <button 
            onClick={onClear}
            className="flex-1 md:flex-none bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-2xl font-bold border border-red-500/20 transition-all"
          >
            مسح الكل
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-8">
        <div className="relative group">
          <input
            type="text"
            className="w-full pl-6 pr-14 py-4 bg-slate-800/30 rounded-2xl border border-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 text-white placeholder-slate-600 transition-all"
            placeholder="بحث بالاسم، القرية، التخصص أو الجامعة..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg className="w-6 h-6 text-slate-500 absolute right-5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto border border-slate-800/50 rounded-3xl bg-slate-900/60 shadow-[0_0_20px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">الاسم الكامل</th>
              <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">القرية</th>
              <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">المعلومات الأكاديمية</th>
              <th className="px-8 py-5 font-black text-xs uppercase tracking-widest">الموقع</th>
              <th className="px-8 py-5 font-black text-xs uppercase tracking-widest text-center">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id} className="hover:bg-blue-500/5 transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                    {s.fullName}
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-black border border-blue-500/20 uppercase shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                      {s.village}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-slate-100 font-bold">{s.major}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.university} • {s.college}</div>
                  </td>
                  <td className="px-8 py-5 text-slate-400 font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
                      {s.studyLocation}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => onDelete(s.id)}
                      className="text-slate-600 hover:text-red-500 p-2.5 rounded-xl hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                      title="حذف الطالب"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-32 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-800/30 rounded-full flex items-center justify-center mb-6 text-slate-700 border border-slate-800">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-xl font-bold text-slate-500">لا يوجد بيانات مسجلة حالياً</p>
                    <p className="text-slate-700 mt-2">ابدأ بإضافة الطلاب من تبويب "إدخال البيانات"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
