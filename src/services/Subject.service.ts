import { IDataSource, SubjectInterface } from "@/interface";
import { subjectsMock } from "@/mocks";

export class SubjectsService implements IDataSource<SubjectInterface> {
  private subjects: SubjectInterface[];

  constructor() {
    this.subjects = subjectsMock.map((subject) => ({ ...subject }));
  }

  getAll(): SubjectInterface[] {
    return [...this.subjects];
  }

  add(subject: SubjectInterface): void {
    this.subjects.push({ ...subject });
  }

  update(id: number, updatedSubject: Partial<SubjectInterface>): void {
    this.subjects = this.subjects.map((s) =>
      s.id === id ? { ...s, ...updatedSubject } : s
    );
  }

  delete(id: number): void {
    this.subjects = this.subjects.filter((s) => s.id !== id);
  }
}
