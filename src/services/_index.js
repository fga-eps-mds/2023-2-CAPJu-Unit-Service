import models from '../models/_index.js';
import UnitService from './unit.js';
import UserService from './user.js';
import UserAccessLogService from './userAccessLog.js';

const unitService = new UnitService(models.Unit);
const userService = new UserService();
const userAccessLogService = new UserAccessLogService();

const services = {
  unitService,
  userService,
  userAccessLogService,
};

export default services;
