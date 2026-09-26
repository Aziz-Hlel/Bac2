import classroomService from '@/Api/service/classroomService';
import { examService } from '@/Api/service/examsService';
import { useCurrentSchool } from '@/contexts/CurrentSchoolContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const EditClassroomExamDialog = () => {
  const schoolId = useCurrentSchool();
  const classroomId = useParams().classroomId!;

  const { data: examsData, isLoading: examIsLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: examService.getCurrentTermExams,
  });

  const allExams = examsData?.data ?? [];

  const { data: classroomCurrentExamsData } = useQuery({
    queryKey: ['classrooms', classroomId, 'exams'],
    queryFn: () => classroomService.getExams({ schoolId, id: classroomId }),
  });

  const classroomCurrentExams = classroomCurrentExamsData?.data ?? [];

  return <div>EditClassroomExamDialog</div>;
};

export default EditClassroomExamDialog;
