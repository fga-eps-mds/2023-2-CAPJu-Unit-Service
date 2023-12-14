import UnitModel from './unit.js';
import UserModel from './user.js';
import RoleModel from './role.js';
import UserAccessLogModel from './userAccesLog.js';

const Unit = UnitModel;
const User = UserModel;
const Role = RoleModel;
const UserAccessLog = UserAccessLogModel;

const models = {
  Unit,
  User,
  Role,
  UserAccessLog,
};

export default models;
