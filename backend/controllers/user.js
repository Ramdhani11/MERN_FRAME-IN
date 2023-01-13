const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};

module.exports = { getUsers, getUser };
