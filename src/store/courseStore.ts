import { create } from "zustand";
import { CourseInterface } from "@/interface";
import { CourseService } from "@/services";

const courseService = new CourseService();

interface CourseStoreState {
  courses: CourseInterface[];
  course: CourseInterface | null;
  fetchCourses: () => Promise<void>;
  fetchOneCourse: (id: number) => Promise<void>;
  addCourse: (course: CourseInterface) => void;
  updateCourse: (id: number, updatedCourse: Partial<CourseInterface>) => void;
  deleteCourse: (id: number) => void;
  updateSubjectsCourse: (courseId: number, subjectIds: number[]) => void;
  updateStudentsCourse: (courseId: number, studentIds: number[]) => void;
}

export const useCourseStore = create<CourseStoreState>((set) => ({
  courses: [],
  course: null,

  fetchCourses: async () => {
    const allCourses = courseService.getAll();
    set({ courses: allCourses });
  },

  fetchOneCourse: async (id) => {
    const singleCourse = courseService.getById(id) || null;
    set({ course: singleCourse });
  },

  addCourse: (course) => {
    courseService.add(course);
    set({ courses: courseService.getAll() });
  },

  updateCourse: (id, updatedCourse) => {
    courseService.update(id, updatedCourse);
    set({ courses: courseService.getAll() });
  },

  deleteCourse: (id) => {
    courseService.delete(id);
    set({ courses: courseService.getAll() });
  },
  updateSubjectsCourse: (courseId, subjectIds) => {
    courseService.updateSubjectsCourse(courseId, subjectIds);
    set({ courses: courseService.getAll() });
    const singleCourse = courseService.getById(courseId) || null;
    set({ course: singleCourse });
  },

  updateStudentsCourse: (courseId, studentIds) => {
    courseService.updateStudentsCourse(courseId, studentIds);
    set({ courses: courseService.getAll() });
    const singleCourse = courseService.getById(courseId) || null;
    set({ course: singleCourse });
  },
}));
