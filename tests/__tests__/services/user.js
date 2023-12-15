import UserService from '../../../src/services/user.js';
import Op from 'sequelize';

describe('UserServices', () => {
  let reqMock;
  let resMock;
  let userService;

  beforeEach(() => {
    userService = new UserService();
    reqMock = {
      body: {},
      params: {},
    };
    resMock = {
      json: jest.fn(),
      status: jest.fn(() => resMock),
    };
  });

  describe('findUserWithRole', () => {
    it('Sucesso - primeiro ternário', async () => {
      const cpf = '12345678901';

      const responseUser = {
        cpf: '12345678901',
        idRole: 4,
        name: 'Cocota Dez',
      };

      const responseRole = {
        allowedActions:
          '{see-unit,see-stage,forward-stage,backward-stage,see-flow,see-process,create-process,archive-process,end-process,edit-process,delete-process,edit-account}',
      };

      userService.repository.findOne = jest
        .fn()
        .mockResolvedValue(responseUser);
      userService.roleRepository.findOne = jest
        .fn()
        .mockResolvedValue(responseRole);

      const result = await userService.findUserWithRole(cpf, ['cpf', 'name']);

      expect(result).toEqual({
        ...responseUser,
        role: {
          idRole: 4,
          allowedActions:
            '{see-unit,see-stage,forward-stage,backward-stage,see-flow,see-process,create-process,archive-process,end-process,edit-process,delete-process,edit-account}',
        },
      });
      expect(userService.repository.findOne).toHaveBeenCalledWith({
        where: { cpf },
        attributes: [...['cpf', 'name'], 'idRole'],
        raw: true,
      });

      expect(userService.roleRepository.findOne).toHaveBeenCalledWith({
        where: { idRole: 4 },
        attributes: ['allowedActions'],
      });
    });

    it('Retornar uma lista de fluxos - segundo ternário', async () => {
      const cpf = '12345678901';

      const responseUser = {
        idRole: 4,
      };

      const responseRole = {
        allowedActions:
          '{see-unit,see-stage,forward-stage,backward-stage,see-flow,see-process,create-process,archive-process,end-process,edit-process,delete-process,edit-account}',
      };

      userService.repository.findOne = jest
        .fn()
        .mockResolvedValue(responseUser);
      userService.roleRepository.findOne = jest
        .fn()
        .mockResolvedValue(responseRole);

      const result = await userService.findUserWithRole(cpf, null);

      expect(userService.repository.findOne).toHaveBeenCalledWith({
        where: { cpf },
        attributes: [...[], 'idRole'],
        raw: true,
      });

      expect(userService.roleRepository.findOne).toHaveBeenCalledWith({
        where: { idRole: 4 },
        attributes: ['allowedActions'],
      });
    });

    it('Retornar uma lista de fluxos - sem userData', async () => {
      const cpf = '12345678901';

      const responseUser = undefined;

      userService.repository.findOne = jest
        .fn()
        .mockResolvedValue(responseUser);

      const result = await userService.findUserWithRole(cpf, null);

      expect(result).toEqual(undefined);

      expect(userService.repository.findOne).toHaveBeenCalledWith({
        where: { cpf },
        attributes: [...[], 'idRole'],
        raw: true,
      });
    });
  });
});
