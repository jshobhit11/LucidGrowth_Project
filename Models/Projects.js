import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  demoLink: { type: String, required: true },
  sourceCodeLink: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
});

const project = mongoose.model("Project", ProjectSchema);

export default project;
