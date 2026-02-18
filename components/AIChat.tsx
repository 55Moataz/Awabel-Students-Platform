
import React, { useState, useRef, useEffect } from 'react';
import { parseStudentData, getGeneralResponse } from '../services/geminiService';
import { Student } from '../types';

interface AIChatProps {
  onParsedData: (data: Omit<Student, 'id' | 'createdAt'>) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onParsedData }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isParsing?: boolean }[]>([
    { 
      role: 'model', 
      text: "مرحباً بك. أنا المساعد الإداري الذكي لمكتب الأستاذ مهدي علي مهدي. \n\nيمكنك ببساطة لصق بيانات الطلاب هنا بشكل نصي وسأقوم بتحليلها وإضافتها للسجل تلقائياً!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // AI Logic
    const result = await parseStudentData(userMsg);
    
    if (result && result.isComplete) {
      // Add data to main list
      onParsedData({
        fullName: result.fullName,
        village: result.village,
        university: result.university,
        college: result.college,
        major: result.major,
        academicLevel: result.academicLevel,
        studyLocation: result.studyLocation
      });

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `✅ ممتاز! تم معالجة البيانات بنجاح:\n\n👤 الاسم: ${result.fullName}\n📍 القرية: ${result.village}\n🎓 التخصص: ${result.major}\n\nتمت الإضافة إلى لوحة التحكم بنجاح.` 
      }]);
    } else if (result && !result.isComplete) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `البيانات التي قدمتها غير مكتملة، أحتاج لبعض الحقول الإضافية: \n\n${result.missingFields.map(f => `• ${f}`).join('\n')}` 
      }]);
    } else {
      // General chat fallback
      const history = messages.map(m => ({ 
        role: m.role, 
        parts: [{ text: m.text }] 
      }));
      history.push({ role: 'user', parts: [{ text: userMsg }] });
      
      const response = await getGeneralResponse(history);
      setMessages(prev => [...prev, { role: 'model', text: response || "عذراً، واجهت مشكلة في معالجة الطلب." }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-950/20 backdrop-blur-xl">
      <div className="p-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-black text-white">المعالج الذكي AI</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Shuaib Admin Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
           <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="text-xs font-black text-blue-400">النظام نشط</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow p-8 overflow-y-auto bg-slate-900/10 space-y-6 scroll-smooth"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] px-5 py-4 rounded-3xl shadow-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-slate-800 text-white rounded-tr-none border border-slate-700' 
                : 'bg-blue-600 text-white rounded-tl-none shadow-blue-600/10'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-blue-600/10 text-blue-400 px-6 py-3 rounded-2xl flex gap-3 items-center border border-blue-500/20">
              <span className="flex gap-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </span>
              جاري تحليل البيانات...
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-950/50 border-t border-slate-800 backdrop-blur-md">
        <div className="flex gap-3 relative">
          <input
            type="text"
            className="flex-grow px-6 py-4 bg-slate-800/80 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 border border-slate-700 focus:border-blue-500 text-white placeholder-slate-500 transition-all shadow-inner"
            placeholder="مثال: سجل الطالب محمد منصور، قرية غالظ، جامعة عدن كلية الطب..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl transition-all duration-300 disabled:opacity-50 shadow-lg shadow-blue-600/20 active:scale-90"
          >
            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
