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
    const currentUnit = await this.findOne({name: name?.trim()})
    if(currentUnit){
      throw {status: 409, message: "Nome da unidade já existe. Por favor, escolha um nome diferente"}
    }
    return this.unit.create({ name });
  }

  async getUnitById(idUnit) {
    return this.unit.findOne({
      where: { idUnit },
    });
  }

  async updateUnit(idUnit, name) {
    const currentUnit = await this.findOne({ name: name?.trim(), idUnit: { [Op.ne]: idUnit } } )
    if(currentUnit){
      throw {status: 409, message: "Nome da unidade já existe. Por favor, escolha um nome diferente"}
    }
    const unit = await this.getUnitById(idUnit);
    if (unit) {
      const [updatedRows] = await this.unit.update(
        { name: name },
        { where: { idUnit: idUnit } },
      );
      if (updatedRows) return true;
    }
    throw {status: 404, message: "Essa unidade não existe!"}
  }

  async deleteUnit(idUnit) {
    const unit = await this.getUnitById(idUnit);
    if (unit) {
      const [updatedRows] = await this.unit.destroy({ where: { idUnit } });
      if (updatedRows) return true;
    }
    return false;
  }

  async findOne(where){
    return await this.unit.findOne({where})
  }
}
export default UnitService;
