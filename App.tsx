
import React, { useState, useEffect } from 'react';
import { Student, APPROVED_VILLAGES, StudyLocation } from './types';
import { ADMIN_INFO } from './constants';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard' | 'ai'>('form');

  useEffect(() => {
    const saved = localStorage.getItem('shuaib_students');
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved students");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shuaib_students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...student,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const deleteStudent = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const clearAllData = () => {
    if (window.confirm('تحذير: سيتم مسح كافة البيانات المسجلة. هل أنت متأكد؟')) {
      setStudents([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl no-print">
        {/* Navigation Tabs - Styled as Glassmorphism */}
        <div className="flex flex-wrap gap-2 mb-8 glass-panel p-2 rounded-2xl border border-slate-800/50 shadow-2xl">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'form' 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            إدخال البيانات
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            لوحة التحكم ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'ai' 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            المساعد الذكي (AI)
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-panel rounded-3xl shadow-2xl overflow-hidden min-h-[500px] border border-slate-800/50">
          {activeTab === 'form' && (
            <StudentForm onAdd={addStudent} />
          )}
          {activeTab === 'dashboard' && (
            <Dashboard 
              students={students} 
              onDelete={deleteStudent} 
              onClear={clearAllData}
            />
          )}
          {activeTab === 'ai' && (
            <AIChat onParsedData={addStudent} />
          )}
        </div>
      </main>

      {/* Footer & Credits */}
      <footer className="bg-slate-950 text-slate-400 py-10 no-print mt-auto border-t border-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-panel inline-block p-8 rounded-3xl border border-blue-500/10 mb-6 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-1">{ADMIN_INFO.name}</h3>
            <p className="text-blue-400 font-semibold mb-4">{ADMIN_INFO.title}</p>
            <a 
              href={`tel:${ADMIN_INFO.phone}`} 
              className="text-xl font-mono bg-blue-500/10 text-blue-400 px-6 py-2 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-all"
            >
              {ADMIN_INFO.phone}
            </a>
          </div>
          <p className="text-sm text-slate-600 mb-2 font-medium">
            حقوق الطبع محفوظة © {new Date().getFullYear()} - اتحاد الشعيب
          </p>
          <p className="text-[10px] md:text-xs text-blue-500/30 font-bold tracking-wide mt-4 uppercase">
            تطوير المهندس: معتز الشعيبي | للتواصل: <a href="tel:778182340" className="hover:text-blue-400 transition-colors">778182340</a>
          </p>
        </div>
      </footer>

      {/* Print View Components */}
      <div className="print-only p-10 bg-white text-black">
        <div className="text-center mb-8 border-b-4 border-double border-black pb-4">
          <h1 className="text-3xl font-black mb-2">اتحاد طلاب الشعيب</h1>
          <h2 className="text-xl font-bold">كشف بيانات طلاب وطالبات مدينة العوابل</h2>
          <p className="mt-2 text-sm">بإشراف المندوب: {ADMIN_INFO.name}</p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">الاسم الرباعي</th>
              <th className="border p-2">القرية</th>
              <th className="border p-2">الجامعة / الكلية</th>
              <th className="border p-2">التخصص</th>
              <th className="border p-2">المستوى</th>
              <th className="border p-2">الموقع</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={s.id}>
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2">{s.fullName}</td>
                <td className="border p-2">{s.village}</td>
                <td className="border p-2">{s.university} - {s.college}</td>
                <td className="border p-2">{s.major}</td>
                <td className="border p-2">{s.academicLevel}</td>
                <td className="border p-2">{s.studyLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-16 flex justify-between px-10">
          <div className="text-center">
            <p className="font-bold underline mb-10">توقيع المندوب</p>
            <p className="text-sm">{ADMIN_INFO.name}</p>
          </div>
          <div className="text-center">
            <p className="font-bold underline">ختم الاتحاد</p>
            <div className="mt-8 h-24 w-24 border-4 border-black rounded-full mx-auto flex items-center justify-center opacity-30">
              <span className="text-[10px] font-bold">ختم رسمي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
