const userValidate = require("../Validator/validateUser");
const userModel = require("../model/authModel");

exports.userCreate = async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
    const user = userModel(req.body);

    await user.save();
    return res.status(201).json({
      message: "user Created ",
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
};
