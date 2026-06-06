import { SelectedRowProvider } from './context/selected-row-provider';
import Main from './Main';

const ClassroomIndex = () => {
  return (
    <SelectedRowProvider>
      <Main />
    </SelectedRowProvider>
  );
};

export default ClassroomIndex;
