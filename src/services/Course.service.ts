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

  getById(id: number): CourseInterface | undefined {
    return this.courses.find((course) => course.id === id);
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
  updateSubjectsCourse(courseId: number, subjectIds: number[]): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId) {
        return { ...course, subjects: subjectIds };
      }
      return course;
    });
  }

  updateStudentsCourse(courseId: number, studentIds: number[]): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId) {
        return { ...course, students: studentIds };
      }
      return course;
    });
  }
}
