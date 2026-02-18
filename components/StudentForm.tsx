
import React, { useState } from 'react';
import { Student, APPROVED_VILLAGES, StudyLocation, Village } from '../types';

interface StudentFormProps {
  onAdd: (student: Omit<Student, 'id' | 'createdAt'>) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    village: APPROVED_VILLAGES[0] as Village,
    university: '',
    college: '',
    major: '',
    academicLevel: '',
    studyLocation: 'داخل الشعيب' as StudyLocation,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);

    const message = `🏢 مكتب مندوب العوابل\n\n👤 اسم الطالب: ${formData.fullName}\n🏠 القرية: ${formData.village}\n🎓 التخصص: ${formData.major}\n🏫 الجامعة: ${formData.university}\n📚 المستوى: ${formData.academicLevel}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/967772328164?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setFormData({
      fullName: '',
      village: APPROVED_VILLAGES[0] as Village,
      university: '',
      college: '',
      major: '',
      academicLevel: '',
      studyLocation: 'داخل الشعيب',
    });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClasses = "w-full px-5 py-3.5 bg-slate-900/60 rounded-2xl border border-slate-800 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 shadow-inner";
  const labelClasses = "block text-sm font-bold text-slate-400 mb-2 mr-1 uppercase tracking-wider";

  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-700">
      <div className="flex items-center gap-5 mb-12">
        <div className="w-14 h-14 bg-blue-600/10 text-blue-500 rounded-3xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">تسجيل بيانات جديد</h2>
          <p className="text-slate-500 mt-1 font-medium">سيتم تخزين بياناتك محلياً وإرسالها للمندوب مباشرة</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1 md:col-span-2">
          <label className={labelClasses}>الاسم الرباعي الكامل</label>
          <input
            required
            type="text"
            className={inputClasses}
            placeholder="أدخل اسمك الرباعي كما في البطاقة الشخصية"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>القرية السكنية</label>
          <select
            className={`${inputClasses} appearance-none cursor-pointer`}
            value={formData.village}
            onChange={e => setFormData({ ...formData, village: e.target.value as Village })}
          >
            {APPROVED_VILLAGES.map(v => (
              <option key={v} value={v} className="bg-slate-900">{v}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>اسم الجامعة</label>
          <input
            required
            type="text"
            className={inputClasses}
            placeholder="مثال: جامعة عدن"
            value={formData.university}
            onChange={e => setFormData({ ...formData, university: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>الكلية</label>
          <input
            required
            type="text"
            className={inputClasses}
            placeholder="مثال: كلية الحقوق"
            value={formData.college}
            onChange={e => setFormData({ ...formData, college: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>التخصص الدقيق</label>
          <input
            required
            type="text"
            className={inputClasses}
            placeholder="أدخل تخصصك الدراسي"
            value={formData.major}
            onChange={e => setFormData({ ...formData, major: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>المستوى الدراسي الحالي</label>
          <input
            required
            type="text"
            className={inputClasses}
            placeholder="سنة أولى، ثانية، خريج..."
            value={formData.academicLevel}
            onChange={e => setFormData({ ...formData, academicLevel: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClasses}>مكان الدراسة الحالية</label>
          <select
            className={`${inputClasses} appearance-none cursor-pointer`}
            value={formData.studyLocation}
            onChange={e => setFormData({ ...formData, studyLocation: e.target.value as StudyLocation })}
          >
            <option value="داخل الشعيب" className="bg-slate-900">داخل الشعيب</option>
            <option value="الضالع" className="bg-slate-900">الضالع</option>
            <option value="عدن" className="bg-slate-900">عدن</option>
            <option value="خارج الوطن" className="bg-slate-900">خارج الوطن</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 pt-8">
          <button
            type="submit"
            className="btn-neon group relative w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-4 text-xl border border-blue-400/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            تأكيد التسجيل وإرسال البيانات
          </button>
          
          {submitted && (
            <div className="mt-8 p-5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-2xl text-center font-black animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              🚀 تم حفظ بياناتك بنجاح وجاري تحويلك للواتساب
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
