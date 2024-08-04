import Skill from "../Models/Skills.js";
// import User from "../Models/user_model.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addSkill = async (req, res) => {
  const { name, level } = req.body;
  try {
    const newSkill = new Skill({ name, level });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a skill by ID
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level } = req.body;
  try {
    const skill = await Skill.findById(id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    skill.name = name || skill.name;
    skill.level = level || skill.level;

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a skill by ID
export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if id is valid (optional, depending on your needs)
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill deleted" });
  } catch (err) {
    console.error(err); // Log error for server-side debugging
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = { getSkills, addSkill, updateSkill, deleteSkill };
