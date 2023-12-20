import { Op } from 'sequelize';

class UnitService {
  constructor(UnitModel) {
    this.unit = UnitModel;
  }

  async getAllUnits(where, offset, limit) {
    return this.unit.findAll({
      where,
      offset: offset,
      limit: limit,
    });
  }

  async countRows({ where }) {
    return this.unit.count({ where });
  }

  async createUnit(name) {
    await this.validateUnitNameAvailability(name);
    return this.unit.create({ name });
  }

  async getUnitById(idUnit) {
    return this.unit.findOne({
      where: { idUnit },
    });
  }

  async updateUnit(idUnit, name) {
    const unit = await this.getUnitById(idUnit);
    if (!unit) {
      throw { status: 404, message: 'Essa unidade não existe!' };
    }
    await this.validateUnitNameAvailability(name, idUnit);

    const [updatedRows] = await this.unit.update(
      { name },
      { where: { idUnit } },
    );
    return updatedRows;
  }

  async deleteUnit(idUnit) {
    const unit = await this.getUnitById(idUnit);
    if (unit) {
      const [updatedRows] = await this.unit.destroy({ where: { idUnit } });
      if (updatedRows) return true;
    }
    return false;
  }

  async findOne(where) {
    return await this.unit.findOne({ where });
  }

  async validateUnitNameAvailability(name, excludeIdUnit = null) {
    const filter = {
      name: name?.trim(),
      ...(excludeIdUnit && { idUnit: { [Op.ne]: excludeIdUnit } }),
    };
    const existingUnit = await this.findOne(filter);
    if (existingUnit) {
      throw {
        status: 409,
        message:
          'Nome da unidade já existe. Por favor, escolha um nome diferente',
      };
    }
  }
}
export default UnitService;
