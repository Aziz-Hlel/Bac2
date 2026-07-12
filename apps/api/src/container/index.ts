import { EmailRouter } from '@/email/email.route';
import { createMediaModule } from '@/media';
import { createExamModule } from '@/modules/Exam/exam.module';
import { ExamSessionModule } from '@/modules/ExamSession/examSession.module';
import { createAuthModule, createUserModule } from '@/modules/User';
import { ClassModule } from '@/modules/class/class.module';
import { createMajorModule } from '@/modules/major/major.module';
import { createRootModule } from '@/modules/root';
import { createSchoolModule } from '@/modules/school/school.module';
import { SchoolCapacityStatModule } from '@/modules/schoolCapacityStat/schoolCapacityStat.module';
import { createTeacherModule } from '@/modules/teacher/teacher.module';
import { SeedDevService } from '@/seeds/dev/seedDev.service';
import { ClassroomSeedService } from '@/seeds/fakes/classroom.seed.service';
import { ClassroomPrincipalAssignmentSeedService } from '@/seeds/fakes/classroomPrincipalAssignment.seed.service';
import { ExamSeedService } from '@/seeds/fakes/exam.seed.service';
import { MajorSeedService } from '@/seeds/fakes/major.seed.service';
import { SchoolSeedService } from '@/seeds/fakes/school.seed.service';
import { TeacherSeedService } from '@/seeds/fakes/teacher.seed.service';
import { UserSeedService } from '@/seeds/fakes/user.seed.service';
import { Router } from 'express';

// * ROOT
const { rootRouter } = createRootModule();

// * MEDIA
const { mediaRouter } = createMediaModule();

// * USER
const { userRouter, userInternalService } = createUserModule();

// * AUTH
const { authRouter } = createAuthModule(userInternalService);

// * MAJOR
const { majorRouter } = createMajorModule();

// * EXAM
const { examRouter, examService, examRepo } = createExamModule();

// * SCHOOL
const { schoolRouter, schoolService } = createSchoolModule(userInternalService);

// * TEACHER
const { teacherRouter } = createTeacherModule({ schoolService });

// * CLASS
const { classRouter, classRepo } = ClassModule();

// * EXAM SESSION
const { examSessionRouter, examSessionService } = ExamSessionModule({ examRepo, classRepo });

// * SCHOOL CAPACITY STATS
const { schoolCapacityStatRoute } = SchoolCapacityStatModule({ examSessionService, examService });

// * SEED
const majorSeed = new MajorSeedService();
const examSeed = new ExamSeedService();
const userSeed = new UserSeedService(userInternalService);
const schoolSeed = new SchoolSeedService();
const classroomSeed = new ClassroomSeedService();
const teacherSeed = new TeacherSeedService();
const classroomPrincipalAssignmentSeedService = new ClassroomPrincipalAssignmentSeedService();

const devSeed = new SeedDevService(
  majorSeed,
  examSeed,
  userSeed,
  schoolSeed,
  classroomSeed,
  teacherSeed,
  classroomPrincipalAssignmentSeedService,
);
devSeed.run();

export const container: { router: Router; resource: string }[] = [
  { router: rootRouter, resource: '' },
  { router: mediaRouter, resource: 'media' },
  { router: EmailRouter, resource: 'email' },
  { router: userRouter, resource: 'users' },
  { router: authRouter, resource: 'auth' },
  { router: majorRouter, resource: 'majors' },
  { router: examRouter, resource: 'exams' },
  { router: schoolRouter, resource: 'schools' },
  { router: schoolCapacityStatRoute, resource: 'schools/:schoolId/capacity-stats' },
  { router: teacherRouter, resource: 'schools/:schoolId/teachers' },
  { router: classRouter, resource: 'schools/:schoolId/classrooms' },
  { router: examSessionRouter, resource: 'schools/:schoolId/exam-sessions' },
];
