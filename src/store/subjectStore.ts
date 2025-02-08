import { create } from "zustand";
import { SubjectInterface } from "@/interface";
import { SubjectsService } from "@/services";

const subjectsDataSource = new SubjectsService();

interface SubjectStoreState {
  subjects: SubjectInterface[];
  fetchSubjects: () => Promise<void>;
  addSubject: (subject: SubjectInterface) => void;
  updateSubject: (
    id: number,
    updatedSubject: Partial<SubjectInterface>
  ) => void;
  deleteSubject: (id: number) => void;
}

export const useSubjectStore = create<SubjectStoreState>((set) => ({
  subjects: [],
  fetchSubjects: async () => set({ subjects: subjectsDataSource.getAll() }),
  addSubject: (subject) => {
    subjectsDataSource.add(subject);
    set({ subjects: subjectsDataSource.getAll() });
  },
  updateSubject: (id, updatedSubject) => {
    subjectsDataSource.update(id, updatedSubject);
    set({ subjects: subjectsDataSource.getAll() });
  },
  deleteSubject: (id) => {
    subjectsDataSource.delete(id);
    set({ subjects: subjectsDataSource.getAll() });
  },
}));
