import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_MERCHANT_PASS } from "../config";

const prismaclient = new PrismaClient();
export const merchantRouter = Router();

const signupBody = z.object({
  username: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

merchantRouter.post("/signup", async (req, res) => {
  const { success, data } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  const { username, password, name } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prismaclient.$transaction(async (tx) => {
      const merchant = await tx.merchant.create({
        data: {
          username,
          password: hashedPassword,
          name,
        },
      });

      await tx.merchantAccount.create({
        data: {
          merchantId: merchant.id,
        },
      });
    });
    return res.status(201).json({
      message: "Signed up successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error while signing up",
    });
  }
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

merchantRouter.post("/signin", async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  const { username, password } = data;

  try {
    const merchant = await prismaclient.merchant.findFirst({
      where: {
        username,
      },
    });

    if (!merchant || !(await bcrypt.compare(password, merchant.password))) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: merchant.id,
      },
      JWT_MERCHANT_PASS,
      { expiresIn: "1h" },
    );

    return res.json({
      token,
      message: "Signed in successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error while signing in",
    });
  }
});
