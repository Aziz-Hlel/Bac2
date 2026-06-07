import { SelectedRowProvider } from './context/selected-row-provider';
import Main from './Main';

const TeacherTableIndex = () => {
  return (
    <SelectedRowProvider>
      <Main />
    </SelectedRowProvider>
  );
};

export default TeacherTableIndex;
