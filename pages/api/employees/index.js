import nc from "next-connect";
import { connectDb, disconnectDb } from "../../../utils/db";
import Employees from "../../../utils/employeeSchema";

const handler = nc();
handler.post(async (req, res) => {
  try {
    await connectDb();
    const { firstName, lastName, birthday, age } = req.body;

    if (!firstName || !lastName || !birthday || !age) {
      return res
        .status(400)
        .json({ message: "Please fill in all the required fields" });
    }
    const employee = await Employees.findOne({ firstName, lastName });
    if (employee) {
      return res.status(400).json({ message: "employee is already exist" });
    }
    const newEmployee = new Employees({
      firstName,
      lastName,
      birthday,
      age,
    });

    const data = await newEmployee.save();
    res.json(data);
    await disconnectDb();
  } catch (error) {
    await disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    await connectDb();
    const employees = await Employees.find();
    if (!employees.length > 0) {
      return res.status(400).json({ message: "No collection found yet" });
    }

    res.json(employees);
    await disconnectDb();
  } catch (error) {
    await disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;
