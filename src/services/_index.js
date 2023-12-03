import models from '../models/_index.js';
import UnitService from './unit.js';
import UserService from "./user.js";

const unitService = new UnitService(models.Unit);
const userService = new UserService();

const services = {
  unitService,
  userService,
};

export default services;
