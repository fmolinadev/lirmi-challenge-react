import { IDataSource, StudentInterface } from "@/interface";
import { studentsMock } from "@/mocks";

export class StudentsService implements IDataSource<StudentInterface> {
  private students: StudentInterface[];

  constructor() {
    this.students = studentsMock.map((student) => ({ ...student }));
  }

  getAll(): StudentInterface[] {
    return [...this.students];
  }

  add(student: StudentInterface): void {
    this.students.push({ ...student });
  }

  update(id: number, updatedStudent: Partial<StudentInterface>): void {
    this.students = this.students.map((s) =>
      s.id === id ? { ...s, ...updatedStudent } : s
    );
  }

  delete(id: number): void {
    this.students = this.students.filter((s) => s.id !== id);
  }
}
