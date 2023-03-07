import nc from "next-connect";
import { connectDb, disconnectDb } from "../../../utils/db";
import Employees from "../../../utils/employeeSchema";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await connectDb();

    const employee = await Employees.findById(req.query.id);
    if (!employee) {
      return res
        .status(404)
        .json({ message: "The server cannot find the requested resource" });
    }
    res.json(employee);
    await disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    await connectDb();

    const { firstName, lastName, birthday, age } = req.body;

    const employee = await Employees.findByIdAndUpdate(
      req.query.id,
      { $set: { firstName, lastName, birthday, age } },
      { new: true }
    );
    if (!employee) {
      return res
        .status(404)
        .json({ message: "The server cannot find the requested resource" });
    }
    res.json(employee);
    await disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    await connectDb();

    const employee = await Employees.findByIdAndDelete(req.query.id);
    if (!employee) {
      return res
        .status(404)
        .res.json({ message: "The server cannot find the requested resource" });
    }
    res.json({ message: "You deleted one item" });
    await disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
