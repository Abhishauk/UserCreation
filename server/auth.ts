import { Request, Response } from "express";
import User from "./models/usermodel";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();
interface SavedOTPS {
  [key: string]: string;
}

let savedOTPS: SavedOTPS = {};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});

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

    const datas = await User.find();
    if (password !== retypePassword) {
      return res.status(400).json({ msg: "password does not match" });
    }
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Configure email options
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Your OTP for verification",
      text: `Your OTP is: ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, async function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send("couldn't send");
      } else {
        savedOTPS[email] = otp;
        setTimeout(() => {
          delete savedOTPS[email];
        }, 60000);

        // Now, return a response with the OTP
        return res
          .status(200)
          .json({ success: true, message: "OTP sent successfully", otp });
      }
    });
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

export const sendOTPsignin = async (req: Request, res: Response) => {
  try {
    // Extract email from the request body
    const { email } = req.body;
    console.log("aaaaaaa",email);
    

    // Generate OTP (for demonstration purposes)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Configure email options
    const mailOptions = {
      from: process.env.USER_EMAIL, // Update with your email
      to: email,
      subject: "Your OTP for verification",
      text: `Your OTP is: ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send("couldn't send");
      } else {
        savedOTPS[email] = otp;
        setTimeout(() => {
          delete savedOTPS[email];
        }, 60000);
        return res
          .status(200)
          .json({ success: true, message: "OTP sent successfully", otp });
      }
    });
  } catch (error) {
    // Handle errors
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyotpSignup = async (req: Request, res: Response) => {
  try {
    const otp = req.body.otp;
    const {
      email,
      firstName,
      lastName,
      password,
      retypePassword,
      contactMode
    } = req.body.data;

    if (savedOTPS[email] == otp) {
      const salt = bcrypt.genSaltSync();
      const passwordHash = bcrypt.hashSync(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        password: passwordHash,
        retypePassword: passwordHash,
        contactMode,
        email
      });

      await newUser.save();

      return res
        .status(200)
        .json({ success: true, message: "User signed up successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyotpSignin = async (req: Request, res: Response) => {
  console.log("Request body:", req.body);

  const { email, otp } = req.body;

  console.log("Received OTP:", otp);
  console.log("User's email:", email);

  console.log("Saved OTPs:", savedOTPS);

  if (savedOTPS[email] === otp) {
    console.log("OTP matched.");
    return res
      .status(200)
      .json({ success: true, message: "User signed in successfully" });
  } else {
    console.log("Invalid OTP.");
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};


export const sendOTPforgot = async (req: Request, res: Response) => {
  try {
    // Extract email from the request body
    const { email } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email: email });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid user" });
    }

    // Generate OTP (for demonstration purposes)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Configure email options
    const mailOptions = {
      from: process.env.USER_EMAIL, // Update with your email
      to: email,
      subject: "Your OTP for verification",
      text: `Your OTP is: ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send("Couldn't send");
      } else {
        savedOTPS[email] = otp;
        setTimeout(() => {
          delete savedOTPS[email];
        }, 60000);
        return res
          .status(200)
          .json({ success: true, message: "OTP sent successfully", otp });
      }
    });
  } catch (error) {
    // Handle errors
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyotpforgot = async(req: Request , res: Response) => {
  console.log("Request bodyyyyyyyyy:", req.body);

  const { email, otp } = req.body;

  console.log(" OTP:", otp);
  console.log(" email:", email);

  console.log("Saved OTPs:", savedOTPS);

  if (savedOTPS[email] === otp) {
    console.log("OTP matched.");
    return res
      .status(200)
      .json({ success: true, message: "otp verified successfully" });
  } else {
    console.log("Invalid OTP.");
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
}





export const setpassword = async (req: Request, res: Response) => {
  try {
    const { email, newpass } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(newpass, 10); // 10 is the salt rounds

    // Update the user's hashed password in the database
    await User.updateOne({ email: email }, { $set: { password: hashedPassword } });

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
