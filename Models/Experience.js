import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

const experience = mongoose.model("Experience", ExperienceSchema);

export default experience;
