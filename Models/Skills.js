import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
});

const skill = mongoose.model("Skill", SkillSchema);

export default skill;
