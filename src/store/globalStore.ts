import { create } from "zustand";
import { useCourseStore } from "./courseStore";
import { useStudentStore } from "./studentStore";
import { useSubjectStore } from "./subjectStore";

interface GlobalStoreState {
  totalCourses: number;
  totalStudents: number;
  totalSubjects: number;
  fetchSummary: () => Promise<void>;
}

export const useGlobalStore = create<GlobalStoreState>((set) => ({
  totalCourses: 0,
  totalStudents: 0,
  totalSubjects: 0,
  fetchSummary: async () => {
    useCourseStore.getState().fetchCourses();
    useStudentStore.getState().fetchStudents();
    useSubjectStore.getState().fetchSubjects();

    const courses = useCourseStore.getState().courses;
    const students = useStudentStore.getState().students;
    const subjects = useSubjectStore.getState().subjects;

    set({
      totalCourses: courses.length,
      totalStudents: students.length,
      totalSubjects: subjects.length,
    });
  },
}));
