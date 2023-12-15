import UserAccessLogService from '../../../src/services/userAccessLog.js';
import Op from 'sequelize';

describe('UserServices', () => {
  let reqMock;
  let resMock;
  let userAccessLogService;

  beforeEach(() => {
    userAccessLogService = new UserAccessLogService();
    reqMock = {
      body: {},
      params: {},
    };
    resMock = {
      json: jest.fn(),
      status: jest.fn(() => resMock),
    };
  });

  describe('hasActiveSessionRelatedToJWT', () => {
    it('Sucesso', async () => {
      const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJjcGYiOiIxMjM0NTY3ODkwMSIsImZ1bGxOYW1lIjoiVXN1w6FyaW8gQWRtaW5pc3RyYWRvciBJbmljaWFsIiwiZW1haWwiOiJlbWFpbEBlbWFpbGwuY29tIiwiYWNjZXB0ZWQiOnRydWUsImlkUm9sZSI6NSwidW5pdCI6bnVsbCwicm9sZSI6eyJpZFJvbGUiOjUsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiYWNjZXNzTGV2ZWwiOjUsImFsbG93ZWRBY3Rpb25zIjpbImNyZWF0ZS11bml0Iiwic2VlLXVuaXQiLCJlZGl0LXVuaXQiLCJkZWxldGUtdW5pdCIsInNlZS1yZXF1ZXN0IiwiYWNjZXB0LXJlcXVlc3QiLCJkZWxldGUtcmVxdWVzdCIsInNlZS1wcm9maWxlIiwiZWRpdC1wcm9maWxlIiwiZGVsZXRlLXByb2ZpbGUiLCJtYW5hZ2UtcHJvZmlsZXMiLCJtYW5hZ2UtdXNlci1zZXNzaW9ucyIsImNyZWF0ZS1zdGFnZSIsInNlZS1zdGFnZSIsImVkaXQtc3RhZ2UiLCJkZWxldGUtc3RhZ2UiLCJmb3J3YXJkLXN0YWdlIiwiYmFja3dhcmQtc3RhZ2UiLCJjcmVhdGUtZmxvdyIsImVkaXQtZmxvdyIsInNlZS1mbG93IiwiZGVsZXRlLWZsb3ciLCJjcmVhdGUtcHJvY2VzcyIsImVkaXQtcHJvY2VzcyIsInNlZS1wcm9jZXNzIiwiZGVsZXRlLXByb2Nlc3MiLCJhcmNoaXZlLXByb2Nlc3MiLCJlbmQtcHJvY2VzcyIsInNlZS1zdGF0aXN0aWNzIl19LCJzZXNzaW9uSWQiOiJlNTFiNDBhNy1kZjIyLTQ2YzgtYjg3MC0zNGQxNjQ5ZjUxMzgifSwiZXhwIjoxNzAyNTYyMzMzLCJpYXQiOjE3MDI1MjYzMzN9.-ztw0R-mH-Pt-aejAdy49UkCc6XiHnkr4nKaoi84Zrc";

      const responseSession = {
        id: 1,
        sessionId: 1,
        loginTimestamp: '12/12/2023',
        logoutTimestamp: '12/12/2023',
        expirationTimsestamp: '',
        logoutInitiator: 'userRequested',
        stationIp: '127.0.0.0',
        jwtToken: jwtToken
      };


      userAccessLogService.repository.findOne = jest
        .fn()
        .mockResolvedValue({});

      const result = await userAccessLogService.hasActiveSessionRelatedToJWT(jwtToken);

      expect(result).toEqual(true);

      expect(userAccessLogService.repository.findOne).toHaveBeenCalledWith({
        where: {
          sessionId: 'e51b40a7-df22-46c8-b870-34d1649f5138',
          logoutTimestamp: null,
        },
        attributes: ['id'],
        order: [['id', 'DESC']],
        raw: true,
        logging: false,
      });

    });

  });
});
