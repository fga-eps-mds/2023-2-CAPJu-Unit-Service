import { UnitController } from '../../src/controllers/unit.js';
import UnitService from '../../src/services/unit.js';
import models from '../../src/models/_index.js';
import unit from '../../src/models/unit.js';
import controllers from '../../src/controllers/_index.js';

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

      UnitModelMock.findAll.mockResolvedValue(response);

      const result = await unitService.getAllUnits(undefined, 1, 1);

      expect(result).toEqual(response);
      expect(UnitModelMock.findAll).toHaveBeenCalledWith();
    });
  });
});
