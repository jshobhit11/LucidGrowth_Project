// import User from "../Models/user_model.js";
import Experience from "../Models/Experience.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addExperience = async (req, res) => {
  const { companyName, position, duration, description } = req.body;
  try {
    const newExperience = new Experience({
      companyName,
      position,
      duration,
      description,
    });
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an experience by ID
export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { company, role, description, startDate, endDate } = req.body;
  try {
    const experience = await Experience.findById(id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    experience.company = company || experience.company;
    experience.role = role || experience.role;
    experience.description = description || experience.description;
    experience.startDate = startDate || experience.startDate;
    experience.endDate = endDate || experience.endDate;

    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an experience by ID
// import Experience from "path-to-your-model"; // Ensure you have the correct path to your Experience model

export const deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid (optional, depending on your needs)
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const experience = await Experience.findByIdAndDelete(id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    res.json({ message: "Experience deleted" });
  } catch (err) {
    console.error(err); // Log the error for server-side debugging
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = {
//   getExperiences,
//   addExperience,
//   updateExperience,
//   deleteExperience,
// };
