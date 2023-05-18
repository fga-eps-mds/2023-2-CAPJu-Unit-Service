import nodemailer from "nodemailer";
import db from "../../src/config/database.js";
import Mailer from "../../src/services/mailer.js";

let mailer = new Mailer();

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ success: true }),
  }),
}));

const mockGetMailContents = [
  {
    id_flow: 4,
    flow: "fluxo b",
    process_record: "testeemail",
    process: "123456",
    id_stage: 3,
    stage: "etapa c",
    start_date: "2023-01-21T01:06:14.465Z",
    stage_duration: 2,
    email: "pedrozinho@email.com\n",
    delay_days: "4",
  },
  {
    id_flow: 4,
    flow: "fluxo b",
    process_record: "testeemail",
    process: "123456",
    id_stage: 3,
    stage: "etapa c",
    start_date: "2023-01-21T01:06:14.465Z",
    stage_duration: 2,
    email: "pedro@email.com\n",
    delay_days: "4",
  },
  {
    id_flow: 4,
    flow: "fluxo b",
    process_record: "testeemail",
    process: "123456",
    id_stage: 3,
    stage: "etapa c",
    start_date: "2023-01-21T01:06:14.465Z",
    stage_duration: 2,
    email: "gdbbdb@email.com\n",
    delay_days: "4",
  },
];

const mockCreateTransport = jest.fn(() => ({
  sendMail: jest.fn(),
}));

beforeEach(() => {
  jest.resetModules();
});

jest.mock("../../src/config/database.js", () => {
  const connection = {
    query: jest.fn(),
  };

  return {
    connection,
  };
});

describe("Test for function sendEmail", () => {
  it("should send email correctly", async () => {
    db.connection.query = jest.fn(() => mockGetMailContents);
    const result = mailer.sendEmail();
    expect(result).toBeTruthy();
  });

  it("should log and return false if password is not set", async () => {
    process.env.EMAIL_PASSWORD = "";
    console.log = jest.fn();
    const result = await mailer.sendEmail();
    expect(console.log).toHaveBeenCalledWith("EMAIL_PASSWORD is blank.");
    expect(result).toBe(false);
    delete process.env.EMAIL_PASSWORD;
  });

  it('should return true when there are no late processes', async () => {
    db.connection.query = jest.fn(() => []);
    jest.spyOn(console, 'log').mockImplementation();

    const result = await mailer.sendEmail();

    expect(result).toBe(true);
    expect(console.log).toHaveBeenCalledWith('No late processes.');
  });
});
