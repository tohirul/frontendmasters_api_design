import { Response } from "express";
import prisma from "../database";
import { Request } from "express";
import { comparePassword, generateToken, hashPassword } from "../auth/auth";

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email: req.body.email,
        name: req.body.name,
      },
    });
    const token = generateToken({ id: user.id, username: user.username });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = generateToken({ id: user.id, username: user.username });
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sign in",
      error,
    });
  }
};
