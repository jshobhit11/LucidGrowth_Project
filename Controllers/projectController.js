import Project from "../Models/Projects.js";
// import User from "../Models/user_model.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProject = async (req, res) => {
  const { title, description, technologies, demoLink, sourceCodeLink } =
    req.body;
  let image = `${req.file.filename}`;
  try {
    const newProject = new Project({
      title,
      description,
      technologies,
      demoLink,
      sourceCodeLink,
      image,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, technologies, demoLink, sourceCodeLink, image } =
    req.body;
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;
    project.technologies = technologies || project.technologies;
    project.demoLink = demoLink || project.demoLink;
    project.sourceCodeLink = sourceCodeLink || project.sourceCodeLink;
    project.image = image || project.image;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // Delete a project by ID
// import Project from "path-to-your-model"; // Ensure you have the correct path to your Project model

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is provided and valid (optional, depending on your needs)
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err); // Log the error for server-side debugging
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = { getProjects, addProject, updateProject, deleteProject };
