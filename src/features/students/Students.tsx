import { useState, useMemo, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useDataStore } from '../../store/dataStore';
import type { StudentStatus } from '../../mockData';
import { Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, Download, Plus, Mail, BookOpen, GraduationCap, Activity } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../utils/cn';

export default function Students() {
  const { colors } = useThemeStore();
  const { students, courses, addStudent, deleteStudent, globalSearchTerm, setGlobalSearchTerm } = useDataStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Form state
  const [newStudent, setNewStudent] = useState({ name: '', email: '', courseId: '', status: 'ativo' as StudentStatus });

  // Handle global search
  useEffect(() => {
    if (globalSearchTerm) {
      setSearchTerm(globalSearchTerm);
      setGlobalSearchTerm('');
    }
  }, [globalSearchTerm, setGlobalSearchTerm]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesCourse = courseFilter === 'all' || student.courseId === courseFilter;
      
      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [students, searchTerm, statusFilter, courseFilter]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, courseFilter]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Clock className="w-3 h-3 mr-1" /> Ativo
          </span>
        );
      case 'formado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Formado
          </span>
        );
      case 'evadido':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3 h-3 mr-1" /> Evadido
          </span>
        );
      default:
        return null;
    }
  };

  const getCourseName = (id: string) => courses.find((c: any) => c.id === id)?.name || 'Desconhecido';

  const handleExportCSV = () => {
    const headers = ['Nome', 'E-mail', 'Curso', 'Status', 'Progresso (%)', 'Engajamento', 'Último Login'];
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(s => [
        `"${s.name}"`,
        `"${s.email}"`,
        `"${getCourseName(s.courseId)}"`,
        s.status,
        s.progress,
        s.engagementScore,
        new Date(s.lastLogin).toLocaleDateString('pt-BR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'alunos_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email || !newStudent.courseId) return;
    
    addStudent(newStudent);
    setIsAddModalOpen(false);
    setNewStudent({ name: '', email: '', courseId: '', status: 'ativo' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Alunos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Acompanhe o desempenho, presença e engajamento dos alunos.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: colors[500] }}
          >
            <Plus className="w-4 h-4" />
            Adicionar Aluno
          </button>
        </div>
      </div>

      <Card className="p-0 border border-gray-200 dark:border-gray-800/60">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800/60 bg-gray-50/50 dark:bg-[#1a1c23]/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent dark:text-white dark:placeholder-gray-500"
              style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-white dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent appearance-none dark:text-white"
                style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
              >
                <option value="all">Todos os Status</option>
                <option value="ativo">Ativos</option>
                <option value="formado">Formados</option>
                <option value="evadido">Evadidos</option>
              </select>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-white dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent appearance-none dark:text-white max-w-[200px] truncate"
                style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
              >
                <option value="all">Todos os Cursos</option>
                {courses.map((course: any) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1a1c23] border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-medium">Aluno</th>
                <th className="px-6 py-4 font-medium">Curso</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Progresso</th>
                <th className="px-6 py-4 font-medium">Engajamento</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-300 max-w-[200px] truncate">
                        {getCourseName(student.courseId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${student.progress}%`,
                              backgroundColor: student.progress < 30 ? '#EF4444' : student.progress < 70 ? '#F59E0B' : '#10B981'
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-medium",
                          student.engagementScore >= 80 ? "text-emerald-600 dark:text-emerald-400" : 
                          student.engagementScore >= 50 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
                        )}>
                          {student.engagementScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Nenhum aluno encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800/60 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredStudents.length === 0 ? (
              <>Nenhum aluno encontrado</>
            ) : (
              <>
                Mostrando <span className="font-medium text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> de <span className="font-medium text-gray-900 dark:text-white">{filteredStudents.length}</span> alunos
              </>
            )}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Adicionar Novo Aluno">
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
            <input 
              required
              type="text" 
              value={newStudent.name}
              onChange={e => setNewStudent({...newStudent, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent dark:text-white"
              style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
            <input 
              required
              type="email" 
              value={newStudent.email}
              onChange={e => setNewStudent({...newStudent, email: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent dark:text-white"
              style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Curso</label>
            <select 
              required
              value={newStudent.courseId}
              onChange={e => setNewStudent({...newStudent, courseId: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent dark:text-white"
              style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
            >
              <option value="" disabled>Selecione um curso</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: colors[500] }}
            >
              Adicionar Aluno
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="Detalhes do Aluno">
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 gap-1">
                  <Mail className="w-3 h-3" /> {selectedStudent.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <BookOpen className="w-4 h-4" /> Curso
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate" title={getCourseName(selectedStudent.courseId)}>
                  {getCourseName(selectedStudent.courseId)}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Status
                </div>
                <div className="mt-1">
                  {getStatusBadge(selectedStudent.status)}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Activity className="w-4 h-4 text-blue-500" /> Progresso
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedStudent.progress}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${selectedStudent.progress}%` }}></div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#12141a] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <GraduationCap className="w-4 h-4 text-emerald-500" /> Nota Média
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedStudent.grade.toFixed(1)}</div>
              </div>
            </div>

            <div className="pt-4 flex justify-between gap-3 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => {
                  if(confirm('Tem certeza que deseja excluir este aluno?')) {
                    deleteStudent(selectedStudent.id);
                    setSelectedStudent(null);
                  }
                }}
                className="px-4 py-2 text-rose-600 dark:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg text-sm font-medium transition-colors"
              >
                Excluir Aluno
              </button>
              <button 
                onClick={() => setSelectedStudent(null)}
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
