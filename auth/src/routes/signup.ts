import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from "@osastickettingapp/common";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters long"),
  ],validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new BadRequestError('Email in use');
    }
    
    const user = User.build({email, password});
    await user.save();

    //generate JWT
   
    const userJwt = jwt.sign({
      id:user.id,
      email:user.email
    },
    process.env.JWT_KEY!|| "secret"
    )
    //store it on the session object
    req.session = {
      jwt:userJwt
    }
    res.status(201).send(user);
  }
);

export { router as signupRouter };
