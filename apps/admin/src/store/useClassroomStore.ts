import type { ClassResponse } from '@bac/contracts/schemas/class/classResponse';
import { create } from 'zustand';

type ClassroomStore = {
  currentClassroom: ClassResponse | null;
  setCurrentClassroom: (classroom: ClassResponse) => void;
};

export const useClassroomStore = create<ClassroomStore>((set) => ({
  currentClassroom: null,
  setCurrentClassroom: (classroom: ClassResponse) => set({ currentClassroom: classroom }),
}));
