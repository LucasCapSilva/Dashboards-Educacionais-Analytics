import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Sun, Moon, BookOpen } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDataStore } from '../../store/dataStore';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { themeMode, toggleTheme, colors } = useThemeStore();
  const { students, courses, setGlobalSearchTerm } = useDataStore();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStudents = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);
    
  const filteredCourses = courses
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectStudent = (name: string) => {
    setGlobalSearchTerm(name);
    setSearchTerm('');
    setIsDropdownOpen(false);
    navigate('/students');
  };

  const handleSelectCourse = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    navigate('/courses');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm) {
      setGlobalSearchTerm(searchTerm);
      setSearchTerm('');
      setIsDropdownOpen(false);
      navigate('/students');
    }
  };

  return (
    <header className="h-16 px-6 bg-white/80 dark:bg-[#12141a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden md:block" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => searchTerm && setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar alunos, turmas..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 transition-all text-sm outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
          />
          
          {/* Search Dropdown */}
          {isDropdownOpen && searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
              {filteredStudents.length === 0 && filteredCourses.length === 0 ? (
                <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                  Nenhum resultado encontrado.
                </div>
              ) : (
                <div className="py-2">
                  {filteredStudents.length > 0 && (
                    <div>
                      <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-[#12141a]">
                        Alunos
                      </div>
                      {filteredStudents.map(student => (
                        <button
                          key={student.id}
                          onClick={() => handleSelectStudent(student.name)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center gap-3 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                            <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{student.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{student.email}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredCourses.length > 0 && (
                    <div>
                      <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-[#12141a] mt-2">
                        Cursos
                      </div>
                      {filteredCourses.map(course => (
                        <button
                          key={course.id}
                          onClick={handleSelectCourse}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center gap-3 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{course.instructor}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Alternar tema"
        >
          {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#12141a]"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

        <button className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 py-1.5 px-3 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm">
            AD
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Diretoria</p>
          </div>
        </button>
      </div>
    </header>
  );
};