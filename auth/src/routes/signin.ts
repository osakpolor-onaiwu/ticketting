import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();
import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@osastickettingapp/common";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("password is required"),
  ], 
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({ email});

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    
    const passwordMatch = await Password.compare(existingUser.password, password);

    if(!passwordMatch) throw new BadRequestError("Invalid credentials");

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! || "secret"
    );
    //store it on the session object
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(existingUser);
  }
);

export { router as signInRouter };
