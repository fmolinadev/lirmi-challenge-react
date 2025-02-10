import { IDataSource, CourseInterface } from "@/interface";
import { coursesMock } from "@/mocks";

export class CourseService implements IDataSource<CourseInterface> {
  private courses: CourseInterface[];

  constructor() {
    this.courses = coursesMock.map((course) => ({ ...course }));
  }

  getAll(): CourseInterface[] {
    return [...this.courses];
  }

  add(course: CourseInterface): void {
    this.courses.push({ ...course });
  }

  update(id: number, updatedCourse: Partial<CourseInterface>): void {
    this.courses = this.courses.map((c) =>
      c.id === id ? { ...c, ...updatedCourse } : c
    );
  }

  delete(id: number): void {
    this.courses = this.courses.filter((c) => c.id !== id);
  }

  linkSubject(courseId: number, subjectId: number): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId && !course.subjects.includes(subjectId)) {
        return {
          ...course,
          subjects: [...course.subjects, subjectId],
        };
      }
      return course;
    });
  }

  unlinkSubject(courseId: number, subjectId: number): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          subjects: course.subjects.filter((id) => id !== subjectId),
        };
      }
      return course;
    });
  }

  linkStudent(courseId: number, studentId: number): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId && !course.students.includes(studentId)) {
        return {
          ...course,
          students: [...course.students, studentId],
        };
      }
      return course;
    });
  }

  unlinkStudent(courseId: number, studentId: number): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          students: course.students.filter((id) => id !== studentId),
        };
      }
      return course;
    });
  }
}
