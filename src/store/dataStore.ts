import { create } from 'zustand';
import db from '../mockData/db.json';
import type { Student, Course } from '../mockData/index';

interface DataState {
  students: Student[];
  courses: Course[];
  globalSearchTerm: string;
  setGlobalSearchTerm: (term: string) => void;
  addStudent: (student: Omit<Student, 'id' | 'avatar' | 'lastLogin' | 'engagementScore' | 'progress' | 'grade' | 'attendance'>) => void;
  deleteStudent: (id: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  students: db.students as Student[],
  courses: db.courses as Course[],
  globalSearchTerm: '',
  setGlobalSearchTerm: (term) => set({ globalSearchTerm: term }),
  addStudent: (studentData) => set((state) => {
    const newStudent: Student = {
      ...studentData,
      id: `s${Date.now()}`,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      lastLogin: new Date().toISOString(),
      engagementScore: 0,
      progress: 0,
      grade: 0,
      attendance: 0,
    };
    
    // Update course total students
    const updatedCourses = state.courses.map(c => 
      c.id === studentData.courseId 
        ? { ...c, totalStudents: c.totalStudents + 1 }
        : c
    );

    return { 
      students: [newStudent, ...state.students],
      courses: updatedCourses
    };
  }),
  deleteStudent: (id) => set((state) => {
    const student = state.students.find(s => s.id === id);
    if (!student) return state;

    const updatedCourses = state.courses.map(c => 
      c.id === student.courseId 
        ? { ...c, totalStudents: Math.max(0, c.totalStudents - 1) }
        : c
    );

    return {
      students: state.students.filter(s => s.id !== id),
      courses: updatedCourses
    };
  })
}));
