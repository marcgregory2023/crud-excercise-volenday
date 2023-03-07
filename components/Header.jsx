import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import ModalForm from "./ui/ModalForm";
import { useSelector, useDispatch } from "react-redux";

import { getStatus, getEmployee } from "../store/slices/employeeSlice";
export default function Header() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.employee.status);

  const handleOpenModal = () => {
    dispatch(getStatus({ ...status, open: true }));
    dispatch(getEmployee({}));
  };

  const handleCloseModal = () => {
    dispatch(getStatus({ ...status, open: false }));
    dispatch(getEmployee({}));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="h1" sx={{ fontSize: "3rem", fontWeight: 700 }}>
          Employee Management
        </Typography>
        <Typography variant="p" sx={{ fontWeight: 400 }}>
          Manage all your existing employee or add a new employee
        </Typography>
      </Box>
      <Button
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={handleOpenModal}
      >
        Add new Employee
      </Button>
      <ModalForm open={status.open} onClose={handleCloseModal} />
    </Box>
  );
}
