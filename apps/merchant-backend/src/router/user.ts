import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_USER_PASS } from "../config";
import { userAuthMiddleware } from "./middleware";

const prismaclient = new PrismaClient();
export const userRouter = Router();

const signupBody = z.object({
  username: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

userRouter.post("/signup", async (req, res) => {
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
      const user = await prismaclient.user.create({
        data: {
          username,
          password: hashedPassword,
          name,
        },
      });
      await tx.userAccount.create({
        data: {
          userId: user.id,
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

userRouter.post("/signin", async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  const { username, password } = data;

  try {
    const user = await prismaclient.user.findFirst({
      where: {
        username,
        password,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_USER_PASS,
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

const onrampSchema = z.object({
  userId: z.string(),
  amount: z.number().positive(),
});

userRouter.post("/onramp", async (req, res) => {
  const { success, data } = onrampSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  const { userId, amount } = data;

  try {
    await prismaclient.userAccount.update({
      where: {
        userId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return res.json({
      message: "On ramping done",
    });
  } catch (e) {
    console.error("Error while onramping:", e);
    return res.status(500).json({
      message: "Error while onramping",
    });
  }
});

const transferSchema = z.object({
  merchantId: z.string(),
  amount: z.number().positive(),
});

userRouter.post("/transfer", userAuthMiddleware, async (req, res) => {
  const { success, data } = transferSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  const { merchantId, amount } = data;
  const userId = req.id;

  try {
    const paymentDone = await prismaclient.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "UserAccount" WHERE "userId" = ${userId} FOR UPDATE`;
      const userAccount = await tx.userAccount.findFirst({
        where: {
          userId,
        },
      });
      if (!userAccount || userAccount.balance < amount) {
        return false;
      }

      await tx.userAccount.update({
        where: {
          userId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await tx.merchantAccount.update({
        where: {
          merchantId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return true;
    });

    if (paymentDone) {
      return res.json({
        message: "Payment done",
      });
    } else {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error during payment";
    console.error("Error during payment:", errorMessage);
    return res.status(500).json({
      message: errorMessage,
    });
  }
});
