import db from './db.json';

export type StudentStatus = 'ativo' | 'formado' | 'evadido';

export interface Student {
  id: string;
  name: string;
  email: string;
  courseId: string;
  status: StudentStatus;
  progress: number;
  grade: number;
  attendance: number;
  engagementScore: number;
  lastLogin: string;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  totalStudents: number;
  completionRate: number;
  dropoutRate: number;
  averageGrade: number;
}

export interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export const mockCourses: Course[] = db.courses;

export const mockStudents: Student[] = db.students as Student[];

export const generalMetrics: Metric[] = [
  { id: 'm1', label: 'Taxa de Retenção', value: '88%', change: 2.5, trend: 'up' },
  { id: 'm2', label: 'Engajamento Médio', value: '76/100', change: 5.1, trend: 'up' },
  { id: 'm3', label: 'Taxa de Conclusão', value: '82%', change: -1.2, trend: 'down' },
  { id: 'm4', label: 'Alunos Ativos', value: mockStudents.filter(s => s.status === 'ativo').length, change: 12, trend: 'up' },
];

export const progressChartData: ChartData[] = [
  { name: 'Jan', concluidos: 20, ativos: 100, evadidos: 5 },
  { name: 'Fev', concluidos: 35, ativos: 120, evadidos: 8 },
  { name: 'Mar', concluidos: 50, ativos: 150, evadidos: 12 },
  { name: 'Abr', concluidos: 80, ativos: 140, evadidos: 15 },
  { name: 'Mai', concluidos: 110, ativos: 130, evadidos: 18 },
  { name: 'Jun', concluidos: 140, ativos: 125, evadidos: 20 },
];

export const statusDistributionData = [
  { name: 'Ativos', value: mockStudents.filter(s => s.status === 'ativo').length, color: '#3B82F6' },
  { name: 'Formados', value: mockStudents.filter(s => s.status === 'formado').length, color: '#10B981' },
  { name: 'Evadidos', value: mockStudents.filter(s => s.status === 'evadido').length, color: '#EF4444' },
];

export const coursePerformanceData: ChartData[] = mockCourses.map(c => ({
  name: c.name.split(' ')[0], // short name
  nota: c.averageGrade,
  engajamento: Math.round(70 + Math.random() * 20)
}));
