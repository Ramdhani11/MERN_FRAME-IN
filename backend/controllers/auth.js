const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const formattedIMG = req.file
    ? req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename
    : "";
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: passwordHash,
      picture: formattedIMG,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.json({ mssg: "Email anda belum terdaftar" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ mssg: "Password anda salah" });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    user.password = "<Secret>";
    res.json({ token, user });
  } catch (error) {
    res.json();
  }
};

module.exports = { register, login };
