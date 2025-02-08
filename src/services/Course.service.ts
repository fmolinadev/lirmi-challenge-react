import { IDataSource, CourseInterface } from "@/interface";
import { coursesMock } from "@/mocks";

export class CourseService implements IDataSource<CourseInterface> {
  private courses = [...coursesMock];

  getAll(): CourseInterface[] {
    return this.courses;
  }

  add(course: CourseInterface): void {
    this.courses.push(course);
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
    const course = this.courses.find((c) => c.id === courseId);
    if (course && !course.subjects.includes(subjectId)) {
      course.subjects.push(subjectId);
    }
  }

  unlinkSubject(courseId: number, subjectId: number): void {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.subjects = course.subjects.filter((id) => id !== subjectId);
    }
  }

  linkStudent(courseId: number, studentId: number): void {
    const course = this.courses.find((c) => c.id === courseId);
    if (course && !course.students.includes(studentId)) {
      course.students.push(studentId);
    }
  }

  unlinkStudent(courseId: number, studentId: number): void {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.students = course.students.filter((id) => id !== studentId);
    }
  }
}
