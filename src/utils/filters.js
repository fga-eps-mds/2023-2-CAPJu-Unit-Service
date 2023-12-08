import { Op } from 'sequelize';

export function filterByNicknameAndRecord(req) {
  return req.query.filter?.type === 'process'
    ? {
        [Op.or]: [
          { record: { [Op.like]: `%${req.query.filter.value}%` } },
          { nickname: { [Op.iLike]: `%${req.query.filter.value}%` } },
        ],
      }
    : {};
}

export function filterByName(req) {
  return req.query.filter?.type === 'unit'
    ? {
        [Op.or]: [{ name: { [Op.iLike]: `%${req.query.filter.value}%` } }],
      }
    : {};
}

export function filterByFullName(req) {
  return req.query.filter?.type === 'user'
    ? {
        [Op.or]: [{ fullName: { [Op.iLike]: `%${req.query.filter.value}%` } }],
      }
    : {};
}
