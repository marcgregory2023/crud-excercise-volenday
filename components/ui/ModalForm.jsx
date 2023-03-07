import { Box, Button, Modal, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

import { getEmployee, getStatus } from "../../store/slices/employeeSlice";
import fetchEmployee from "../../config/axios";

export default function ModalForm({ open, onClose }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { status } = useSelector((state) => state.employee.status);
  const { id } = useSelector((state) => state.employee.data);
  const { firstName, lastName, birthday } = useSelector(
    (state) => state.employee.data
  );

  const dispatch = useDispatch();

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const birthday = new Date(formData.get("birthday"));

    const dob = new Date(String(birthday.toLocaleDateString()));

    const month_diff = Date.now() - dob.getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();
    const newAge = Math.abs(year - 1970);

    const obj = {
      firstName: formData.get("firstname").toLowerCase() ?? "",
      lastName: formData.get("lastname").toLowerCase() ?? "",
      birthday: String(birthday.toLocaleDateString()),
      age: newAge,
    };

    try {
      if (id) {
        const { data } = await fetchEmployee.put(
          `/api/employees/${id}`,
          obj,
          process.env.BASE_URL
        );
      } else {
        const { data } = await fetchEmployee.post(
          "/api/employees",
          obj,
          process.env.BASE_URL
        );
      }

      router.push("/");
      dispatch(getStatus({ ...status, open: false }));
    } catch (error) {
      dispatch(getStatus({ ...status, error: error.message, open: false }));
      setMessage(error.response.data.message);
    }

    dispatch(getEmployee(obj));
  };

  return (
    <Modal open={open || false} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          maxWidth: "600px",
          transform: "translate(-50%,-50%)",
        }}
      >
        <form
          onSubmit={handleForm}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "1rem",
            backgroundColor: "#fff",
            borderRadius: "4px",
          }}
        >
          {status === "loading" && <p>Reading data...</p>}
          {<p style={{ color: "red" }}>{message}</p>}
          <TextField
            label={id ? "" : "First Name"}
            variant="outlined"
            placeholder={id ? firstName : "First Name"}
            type="text"
            fullWidth
            sx={{ margin: "1rem 0" }}
            name="firstname"
            required
          />
          <TextField
            label={id ? "" : "Last Name"}
            variant="outlined"
            placeholder={id ? lastName : "Last Name"}
            type="text"
            sx={{ margin: "1rem 0" }}
            fullWidth
            name="lastname"
            required
          />

          <TextField
            variant="outlined"
            placeholder={id ? birthday : "mm/dd/yyyy"}
            fullWidth
            type="date"
            sx={{ margin: "1rem 0" }}
            name="birthday"
            required
          />
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "100%" }}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
