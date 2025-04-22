import Department from "../models/Department.js";

// ✅ Add new department
const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, error: "Department already exists" });
    }

    const newDep = await Department.create({ name });
    return res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "add department server error" });
  }
};

// ✅ Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get departments server error" });
  }
};

// ✅ Get single department
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

// ✅ Update department
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Department.findByIdAndUpdate(id, { name }, { new: true });
    return res.status(200).json({ success: true, department: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: "update department server error" });
  }
};

// ✅ Delete department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedep = await Department.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "delete department server error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
};