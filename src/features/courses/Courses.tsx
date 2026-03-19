import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useDataStore } from '../../store/dataStore';
import { useThemeStore } from '../../store/themeStore';
import { Users, GraduationCap, TrendingDown, Star, Download, BookOpen } from 'lucide-react';
import type { Course } from '../../mockData';

export default function Courses() {
  const { colors } = useThemeStore();
  const { courses, students } = useDataStore();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleExportCourseReport = (course: Course) => {
    const courseStudents = students.filter(s => s.courseId === course.id);
    
    const headers = ['Nome', 'E-mail', 'Status', 'Progresso (%)', 'Nota', 'Engajamento'];
    const csvContent = [
      headers.join(','),
      ...courseStudents.map(s => [
        `"${s.name}"`,
        `"${s.email}"`,
        s.status,
        s.progress,
        s.grade,
        s.engagementScore
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `relatorio_${course.name.replace(/\s+/g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Turmas e Cursos</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie os cursos ativos e acompanhe a performance das turmas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course: Course, idx: number) => (
          <Card key={course.id} delay={idx * 0.1} className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{course.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Instrutor: {course.instructor}</p>
              </div>
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium bg-opacity-10 dark:bg-opacity-20"
                style={{ backgroundColor: `${colors[500]}20`, color: colors[500] }}
              >
                Ativo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Users className="w-4 h-4" /> Alunos
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{course.totalStudents}</div>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Star className="w-4 h-4 text-amber-500" /> Média
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{course.averageGrade}</div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <GraduationCap className="w-4 h-4 text-emerald-500" /> Conclusão
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{course.completionRate}%</div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <TrendingDown className="w-4 h-4 text-rose-500" /> Evasão
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{course.dropoutRate}%</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedCourse(course)}
                className="flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:opacity-90"
                style={{ backgroundColor: colors[500] }}
              >
                Ver Detalhes
              </button>
              <button 
                onClick={() => handleExportCourseReport(course)}
                className="px-4 py-2 bg-white dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Relatório
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* View Details Modal */}
      <Modal isOpen={!!selectedCourse} onClose={() => setSelectedCourse(null)} title="Detalhes do Curso">
        {selectedCourse && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCourse.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Instrutor: {selectedCourse.instructor}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Users className="w-4 h-4" /> Total de Alunos
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedCourse.totalStudents}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Star className="w-4 h-4 text-amber-500" /> Média Geral
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedCourse.averageGrade.toFixed(1)}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <GraduationCap className="w-4 h-4 text-emerald-500" /> Taxa de Conclusão
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedCourse.completionRate}%</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <TrendingDown className="w-4 h-4 text-rose-500" /> Taxa de Evasão
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedCourse.dropoutRate}%</div>
              </div>
            </div>

            <div className="pt-4 flex justify-end border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
