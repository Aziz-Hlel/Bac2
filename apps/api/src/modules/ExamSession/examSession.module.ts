import { ClassRepo } from '../class/class.repo';
import { ExamRepo } from '../Exam/exam.repo';
import { ExamSessionController } from './examSession.controller';
import { ExamSessionRepo } from './examSession.repo';
import { createRoute } from './examSession.route';
import { ExamSessionService } from './examSession.service';
import { AssignOrchestrator } from './orchestrator/assign.orchestrator';
import { AssignElectiveExamToClassUseCase } from './use-case/assignElectiveExamToClassUseCase';
import { AssignExamToClassesUseCase } from './use-case/assignExamToClasses';
import { AssignMajorExamsToClassUseCase } from './use-case/assignMajorExamsToClassUseCase';

export const ExamSessionModule = ({ examRepo, classRepo }: { examRepo: ExamRepo; classRepo: ClassRepo }) => {
  const examSessionRepo = new ExamSessionRepo();
  const assignMajorExamToClassUseCase = new AssignMajorExamsToClassUseCase(examSessionRepo, examRepo);
  const assignElectiveExamToClassUseCase = new AssignElectiveExamToClassUseCase(examSessionRepo, examRepo);
  const assignExamToClassesUseCase = new AssignExamToClassesUseCase(classRepo, examSessionRepo);
  const assignOrchestrator = new AssignOrchestrator(
    assignMajorExamToClassUseCase,
    assignElectiveExamToClassUseCase,
    assignExamToClassesUseCase,
  );
  const examSessionService = new ExamSessionService(examSessionRepo);
  const examSessionController = new ExamSessionController(examSessionService, assignOrchestrator);
  const examSessionRouter = createRoute(examSessionController);
  return {
    examSessionRouter,
    examSessionService,
  };
};
