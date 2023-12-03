const userValidate = require("../Validator/validateUser");

exports.userCreate = async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
    console.log(req.body);
    res.send("SIGNUP API WORKS FINE");
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
};
