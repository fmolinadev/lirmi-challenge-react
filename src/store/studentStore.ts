import { create } from "zustand";
import { StudentInterface } from "@/interface";
import { StudentsService } from "@/services";

const studentsDataSource = new StudentsService();

interface StudentStoreState {
  students: StudentInterface[];
  fetchStudents: () => Promise<void>;
  addStudent: (student: StudentInterface) => void;
  updateStudent: (
    id: number,
    updatedStudent: Partial<StudentInterface>
  ) => void;
  deleteStudent: (id: number) => void;
}

export const useStudentStore = create<StudentStoreState>((set) => ({
  students: [],
  fetchStudents: async () => {
    const fetchedStudents = studentsDataSource.getAll();
    set({ students: fetchedStudents });
  },
  addStudent: (student) => {
    studentsDataSource.add(student);
    set({ students: studentsDataSource.getAll() });
  },
  updateStudent: (id, updatedStudent) => {
    studentsDataSource.update(id, updatedStudent);
    set({ students: studentsDataSource.getAll() });
  },
  deleteStudent: (id) => {
    studentsDataSource.delete(id);
    set({ students: studentsDataSource.getAll() });
  },
}));
