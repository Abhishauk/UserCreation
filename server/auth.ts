import { Request, Response } from "express";
import User from "./models/usermodel";
import bcrypt from "bcrypt";

export const Home = (req: Request, res: Response) => {
  console.log("keeeeeee");
};

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      password,
      retypePassword,
      contactMode,
      email
    } = req.body;
    console.log("ppppp", req.body);

    const datas = await User.find();
    if(password !== retypePassword) {
      return res.status(400).json({ msg: "password does not match" });
    }
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({ msg: "email already exists" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newData = new User({
      firstName,
      lastName,
      password: passwordHash,
      retypePassword: passwordHash,
      contactMode,
      email
    });

    const saveuser = newData.save();
    res.status(200).json({ msg: "successfully signup", user: datas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ signin: false, msg: "User does not exist" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res
        .status(400)
        .json({ Login: false, msg: "Invalid credentials. " });
    }
    res.status(201).json({ msg: "User Login successfully", user: user });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ signin: false, msg: "Internal Server Error" });
  }
};
