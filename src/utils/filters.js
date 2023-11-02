import { Op } from 'sequelize';

export function filterByNicknameAndRecord(req) {
  return req.query.filter?.type === 'process'
    ? {
        [Op.or]: [
          { record: { [Op.like]: `%${req.query.filter}%` } },
          { nickname: { [Op.like]: `%${req.query.filter}%` } },
        ],
      }
    : {};
}

export function filterByName(req) {
  return req.query.filter?.type === "unit"
    ? {
        [Op.or]: [{ name: { [Op.like]: `%${req.query.filter}%` } }],
      }
    : {};
}

export function filterByFullName(req) {
  return req.query.filter?.type === 'user'
    ? {
        [Op.or]: [{ fullName: { [Op.like]: `%${req.query.filter}%` } }],
      }
    : {};
}
