import { firebaseUserService } from '@/firebase/service/firebase.user.service';
import { TermEnum } from '@bac/db/prisma/enums';
import classroomSeedData from '../data/classrooms/classroomData';
import { majorSeedData } from '../data/exams/majors';
import { schoolSeedData } from '../data/schools/schoolData';
import teacherSeedData from '../data/teachers/teachersData';
import { classroomSeedService } from '../fakes/classroom.seed.service';
import { ExamCreaInputSeed, ExamSeedService } from '../fakes/exam.seed.service';
import { MajorSeedService } from '../fakes/major.seed.service';
import { SchoolSeedService } from '../fakes/school.seed.service';
import { teacherSeedService } from '../fakes/teacher.seed.service';
import { UserSeedService } from '../fakes/user.seed.service';
import { superAdminData } from './userData';
import { userSeedData } from './users.seed';

export class SeedDevService {
  constructor(
    private readonly majorSeedService: MajorSeedService,
    private readonly examSeedService: ExamSeedService,
    private readonly userSeedService: UserSeedService,
    private readonly schoolSeedService: SchoolSeedService,
    private readonly classroomSeedService: classroomSeedService,
    private readonly teacherSeedService: teacherSeedService,
  ) {}

  // V1: old implementation
  private seedSuperUsers = async () => {
    await Promise.all(
      superAdminData.map(async (adminData) => {
        const userRecord = await firebaseUserService.findOrCreateAccount(adminData);
        await this.userSeedService.run({
          authId: userRecord.uid,
          provider: 'SEED',
          role: adminData.role,
          email: adminData.email,
          isEmailVerified: true,
        });
      }),
    );
  };

  private seedUsers = async () => {
    await Promise.all(
      Object.values(userSeedData).map(async (adminData) => {
        const userRecord = await firebaseUserService.findOrCreateAccount({
          email: adminData.email,
          password: adminData.password,
        });
        await this.userSeedService.runV2({
          id: adminData.id,
          authId: userRecord.uid,
          email: adminData.email,
          role: adminData.role,
        });
      }),
    );
  };

  private seedMajors = async () => {
    Object.values(majorSeedData).forEach(async (majorData) => {
      await this.majorSeedService.run({ id: majorData.id, majorName: majorData.name });
    });
  };

  private seedMajorExams = async () => {
    const examsData: ExamCreaInputSeed[] = [];
    Object.values(majorSeedData).forEach(async (majorData) => {
      Object.values(majorData.exams).forEach(async (exam) => {
        exam.PRINCIPAL &&
          examsData.push({ ...exam.PRINCIPAL, isOptional: false, majorId: majorData.id, term: TermEnum.PRINCIPAL });
        exam.RETAKE &&
          examsData.push({ ...exam.RETAKE, isOptional: false, majorId: majorData.id, term: TermEnum.RETAKE });
      });
    });

    await Promise.all(examsData.map((exam) => this.examSeedService.run(exam)));
  };

  private seedSchools = async () => {
    const schoolseeder = Object.values(schoolSeedData).map((school) =>
      this.schoolSeedService.run({ id: school.id, ownerId: school.ownerId }),
    );
    await Promise.all(schoolseeder);
  };

  private seedClassrooms = async () => {
    const classroomseeder = Object.values(schoolSeedData).flatMap((school) =>
      Object.values(classroomSeedData).map((classroom) =>
        this.classroomSeedService.run({ id: classroom.id, name: classroom.name, schoolId: school.id }),
      ),
    );
    await Promise.all(classroomseeder);
  };

  private seedTeachers = async () => {
    const teacherseeder = Object.values(teacherSeedData).map((teacher) =>
      this.teacherSeedService.run(teacher),
    );
    await Promise.all(teacherseeder);
  };

  run = async () => {
    await this.seedSuperUsers();
    await this.seedUsers();
    await this.seedMajors();
    await this.seedMajorExams();
    await this.seedSchools();
    await this.seedClassrooms();
    await this.seedTeachers();

    console.log('✅ SUCCESS : Seeding completed.');
  };
}
