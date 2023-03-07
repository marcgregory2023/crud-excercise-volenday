import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getEmployee, getStatus } from "../../store/slices/employeeSlice";
import { Edit } from "@mui/icons-material";
import fetchEmployees from "../../config/axios";

export default function EmployeeTable({ employees }) {
  const router = useRouter();

  const [emplState, setEmployeeState] = useState({
    status: "idle",
    error: null,
    open: false,
  });
  const dispatch = useDispatch();

  const handleSelect = async (id) => {
    try {
      setEmployeeState({ status: "loading", error: null, open: true });
      const { data } = await fetchEmployees.get(
        `/api/employees/${id}`,
        process.env.BASE_URL
      );

      dispatch(getEmployee({ ...data, id }));
      dispatch(getStatus(emplState));
      setEmployeeState({ status: "success", error: null, open: true });
    } catch (error) {
      setEmployeeState({
        status: "rejected",
        error: error.message,
        open: false,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      alert("Please confirm to delete");
      await fetchEmployees.delete(`/api/employees/${id}`, process.env.BASE_URL);
      router.push("/");
    } catch (error) {
      setEmployeeState({
        status: "rejected",
        error: error.message,
        open: false,
      });
    }
  };

  useEffect(() => {
    dispatch(getStatus(emplState));
  }, [dispatch, emplState]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow
                key={employee._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {" "}
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.birthday}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>
                  <Edit
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleSelect(employee._id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>No Collection Found</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
