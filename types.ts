
export type StudyLocation = 'داخل الشعيب' | 'الضالع' | 'عدن' | 'خارج الوطن';

export interface Student {
  id: string;
  fullName: string;
  village: string;
  university: string;
  college: string;
  major: string;
  academicLevel: string;
  studyLocation: StudyLocation;
  createdAt: number;
}

export const APPROVED_VILLAGES = [
  'المجزرة', 'ذي سكينة', 'غالظ', 'الصافا', 'حوادد', 
  'دار الصنيف', 'النجد', 'السواد', 'فقع', 'زنجي'
] as const;

export type Village = typeof APPROVED_VILLAGES[number];

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
