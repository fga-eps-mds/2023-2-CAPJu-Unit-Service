import { Op } from 'sequelize';

export function filterByName(req) {
  return req.query.filter?.type === 'unit'
    ? {
        [Op.or]: [{ name: { [Op.iLike]: `%${req.query.filter.value}%` } }],
      }
    : {};
}
