const userValidate = require("../Validator/validateUser");
const userModel = require("../model/authModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secret_key = process.env.secret_key;

exports.userCreate = async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
    const user = userModel(req.body);
    const { email, password } = req.body; //destructured email and pasword

    let checkemail = await userModel.findOne({ email });
    if (checkemail) {
      return res.status(201).json({
        message: "Already Registered ",
        data: user,
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const otp = Math.floor(Math.random() * 900000);

      req.body.password = hashPassword;
      req.body.otp = otp;

      console.log(otp);

      console.log(req.body);

      console.log(secret_key);

      const user = userModel(req.body);
      await user.save();

      const token = jwt.sign({ user_id: user._id }, secret_key, {
        expiresIn: "2hr",
      });
      const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.smptemail,
          pass: process.env.smptpass,
        },
      });

      const info = {
        from: process.env.smptemail,
        to: email,
        subject: "wellcome to node js Services 😉",
        html: `<h1>This is New Mail</h1>,
        <p>your otp is ${otp} </p>`,
      };

      transpoter.sendMail(info, (err, res) => {
        if (err) {
          console.log("err");
        } else {
        }
      });

      return res.status(201).json({
        message: "user Created ",
        data: user,
        token,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { body, headers } = req;
    const { authorization } = headers;
    const { otp } = body;
    if (!authorization) {
      return res.status(401).json({
        message: "token not provide",
      });
    } else {
      if (otp == undefined) {
        return res.status(401).json({
          message: "otp not provide",
        });
      } else if (otp.length != 6) {
        return res.status(401).json({
          message: "Otp must be 6 letter",
        });
      } else {
        jWT.verify(authorization, secret_key, async (err, decode) => {
          if (err) {
            return res.status(401).json({
              message: "unauthorization",
            });
          }
          console.log(decode);
          req.userid = decode.user_id;
          var userFind = await userModel.findById(req.userid);
          console.log(userFind);
          if (userFind.otp == otp) {
            await userFind.updateOne({
              isVerify: true,
            });
            return res.status(200).json({
              message: "verify otp ",
            });
          } else {
            return res.status(401).json({
              message: "invalid otp",
            });
          }
        });
      }
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);

    // console.log(req.body)

    res.send("Hello test");
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
};
