import { UnitController } from '../../src/controllers/unit.js';
import UnitService from '../../src/services/unit.js';
import models from '../../src/models/_index.js';
import unit from '../../src/models/unit.js';
import controllers from '../../src/controllers/_index.js';
import Op from 'sequelize';

describe('UnitServices', () => {
  let reqMock;
  let resMock;
  let unitService;

  let UnitModelMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(() => {
    unitService = new UnitService(UnitModelMock);
    reqMock = {
      body: {},
      params: {},
    };
    resMock = {
      json: jest.fn(),
      status: jest.fn(() => resMock),
    };
  });

  describe('findAll', () => {
    it('Retornar uma lista de fluxos', async () => {
      const response = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const where = { [Op.or]: [{ name: { [Op.like]: `%FGA%` } }] };

      UnitModelMock.findAll.mockResolvedValue(response);

      const result = await unitService.getAllUnits(where, 1, 1);

      expect(result).toEqual(response);
      expect(UnitModelMock.findAll).toHaveBeenCalledWith({
        where,
        offset: 1,
        limit: 1,
      });
    });
  });

  describe('countRows', () => {
    it('Retornar a quantidade de unidades', async () => {
      const response = 1;
      const where = { [Op.or]: [{ name: { [Op.like]: `%FGA%` } }] };

      UnitModelMock.count.mockResolvedValue(response);

      const result = await unitService.countRows({ where });

      expect(result).toEqual(response);
      expect(UnitModelMock.count).toHaveBeenCalledWith({ where });
    });
  });

  describe('getUnitById', () => {
    it('Retornar a quantidade de unidades', async () => {
      const response = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const name = 'FGA';

      UnitModelMock.create.mockResolvedValue(response);

      const result = await unitService.createUnit(name);

      expect(result).toEqual(response);
      expect(UnitModelMock.create).toHaveBeenCalledWith({ name });
    });
  });

  describe('Update', () => {
    it('Atualizar uma unidade - Sucesso', async () => {
      const response = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const response2 = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const idUnit = 1;
      const name = 'FGA 2';

      UnitModelMock.findOne.mockResolvedValue(response);
      UnitModelMock.update.mockResolvedValue([1]);

      const result = await unitService.updateUnit(idUnit, name);

      expect(result).toEqual(true);
      expect(UnitModelMock.update).toHaveBeenCalledWith(
        { name: name },
        { where: { idUnit: idUnit } },
      );
    });

    it('Atualizar uma unidade - Sucesso', async () => {
      const response = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const response2 = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const idUnit = 1;
      const name = 'FGA 2';

      UnitModelMock.findOne.mockResolvedValue(response);
      UnitModelMock.update.mockResolvedValue([0]);

      const result = await unitService.updateUnit(idUnit, name);

      expect(result).toEqual(false);
      expect(UnitModelMock.update).toHaveBeenCalledWith(
        { name: name },
        { where: { idUnit: idUnit } },
      );
    });

    it('Atualizar uma unidade - Falha', async () => {
      const response = undefined;

      UnitModelMock.findOne.mockResolvedValue(response);
      const idUnit = 1;
      const name = 'FGA 2';

      const result = await unitService.updateUnit(idUnit, name);

      expect(result).toEqual(false);
    });
  });

  describe('deleteUnit', () => {
    it('Deletar uma unidade - Sucesso', async () => {
      const response = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const idUnit = 1;

      UnitModelMock.findOne.mockResolvedValue(response);
      UnitModelMock.destroy.mockResolvedValue([1]);

      const result = await unitService.deleteUnit(idUnit);

      expect(result).toEqual(true);
      expect(UnitModelMock.destroy).toHaveBeenCalledWith({
        where: { idUnit: idUnit },
      });
    });

    it('Deletar uma unidade - Sucesso', async () => {
      const response = [
        {
          idUnit: 1,
          name: 'FGA',
        },
      ];
      const idUnit = 1;

      UnitModelMock.findOne.mockResolvedValue(response);
      UnitModelMock.destroy.mockResolvedValue([0]);

      const result = await unitService.deleteUnit(idUnit);

      expect(result).toEqual(false);
      expect(UnitModelMock.destroy).toHaveBeenCalledWith({
        where: { idUnit: idUnit },
      });
    });

    it('Deletar uma unidade - Sucesso', async () => {
      const response = undefined;
      const idUnit = 1;

      UnitModelMock.findOne.mockResolvedValue(response);
      const result = await unitService.deleteUnit([1, 2]);

      expect(result).toEqual(false);
    });
  });
});
