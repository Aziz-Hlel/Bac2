import { useAuthStore } from '@/store/useAuthStore';
import { createContext, useContext } from 'react';
import { Outlet } from 'react-router';

const CurrentSchoolContext = createContext<string | undefined>(undefined);
export function CurrentSchoolProvider() {
  const currentSchool = useAuthStore((state) => state.currentSchool);

  if (!currentSchool) return <>Current school still not defined when passed through CurrentSchoolProvider Context</>;

  return (
    <CurrentSchoolContext.Provider value={currentSchool}>
      <Outlet />
    </CurrentSchoolContext.Provider>
  );
}

export const useCurrentSchool = (): string => {
  const schoolId = useContext(CurrentSchoolContext);

  if (schoolId === undefined) {
    throw new Error('useCurrentSchool must be used within a CurrentSchoolProvider');
  }

  return schoolId;
};
