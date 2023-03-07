import mongoose from "mongoose";
const { Schema } = mongoose;
const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "Please enter your firstname",
    },
    lastName: {
      type: String,

      required: "Please enter your lastname",
    },
    birthday: {
      type: String,
      required: "Please enter your birthday",
    },
    age: {
      type: Number,
      required: "Please enter your age",
    },
  },
  { timestamps: true }
);

const Employees =
  mongoose.models.Employees || mongoose.model("Employees", employeeSchema);

export default Employees;
