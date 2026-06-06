import { UserService } from '../User/Service/user.service';
import { SchoolAppService } from './school.app.service';
import { SchoolController } from './school.controller';
import { SchoolRepo } from './school.repo';
import { createRouter } from './school.route';
import { SchoolService } from './school.service';

export const createSchoolModule = (userService: UserService) => {
  const repo = new SchoolRepo();
  const service = new SchoolService(repo);
  const appService = new SchoolAppService(service, repo, userService);
  const controller = new SchoolController(appService);
  const router = createRouter(controller);
  return { schoolRouter: router, schoolService: service };
};
