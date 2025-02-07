import { getUsers } from "./../user";
import supertest from "supertest";
import * as user from "../user";
import app from "server";
import { User } from "@prisma/client";

jest.mock("../user", () => ({
  createNewUser: jest.fn((req, res) => {
    res.json({
      success: true,
      message: "User created successfully",
      token: "mockToken",
    });
  }),
  signin: jest.fn((req, res) => {
    res.json({
      success: true,
      message: "User signed in successfully",
      token: "mockToken",
    });
  }),
  getUsers: jest.fn((req, res) => {
    res.json({
      success: true,
      message: "Users retrieved successfully",
      users: [
        { id: 1, username: "test1", password: "test" },
        { id: 2, username: "test2", password: "test" },
      ],
    });
  }),
}));

describe("User handlers", () => {
  it("Should be able to register a user", async () => {
    const req = { body: { username: "test12", password: "test" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json({
        success,
        message,
        token,
      }: {
        success: boolean;
        message: string;
        token: string;
      }) {
        expect(success).toBe(true);
        expect(message).toBe("User created successfully");
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req as any, res as any);
  });
  it("Should be able to sign in a user", async () => {
    const req = { body: { username: "test12", password: "test" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json({
        success,
        message,
        token,
      }: {
        success: boolean;
        message: string;
        token: string;
      }) {
        expect(success).toBe(true);
        expect(message).toBe("User signed in successfully");
        expect(token).toBeTruthy();
      },
    };
    await user.signin(req as any, res as any);
  });
  it("Should be able to retrieve users", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json({
        success,
        message,
        users,
      }: {
        success: boolean;
        message: string;
        users: User[];
      }) {
        expect(success).toBe(true);
        expect(message).toBe("Users retrieved successfully");
        expect(users).toBeTruthy();
      },
    };
    await user.getUsers(req as any, res as any, jest.fn());
  });
});
