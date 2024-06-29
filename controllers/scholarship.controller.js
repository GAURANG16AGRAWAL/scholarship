const Scholarship = require("../models/scholarship.model.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const addScholarship = async (req, res) => {
  try {
    const { name, amount, nationality, description, course, gender, deadline } = req.body;
    if (!name || !amount || !nationality || !description || !course || !gender || !deadline) {
      return res.status(401).json("Fill in details");
    }
    if (await Scholarship.findOne({ name })) {
      return res.status(401).json("Scholarship already exists");
    }
    const scholarship = await Scholarship.create({ name, amount, nationality, description, course, gender, deadline });
    if (scholarship) return res.status(200).json(scholarship);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
}

const showAllScholarships = async (req, res) => {
  try {
    const query = req.query
    const Scholarships = await Scholarship.find(query)
    return res.status(200).json(Scholarships);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
}

const applyScholarships = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json("token not found");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const Scholarships = await Scholarship.findById(id);
    console.log(Scholarships);
    await User.updateOne(
      { _id: decoded?._id },
      { $push: { applied: { scholarId: id, approved: "pending", name: Scholarships.name } } }
    );
    return res.status(200).json("applied successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
}

const showAppliedScholarships = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json("token not found");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const applied = await User.findById(decoded?._id);
    return res.status(200).json(applied);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
}

module.exports = { addScholarship, showAllScholarships, applyScholarships, showAppliedScholarships };