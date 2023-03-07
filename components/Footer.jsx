import { Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "2rem" }}>
      <Typography>
        Copyright &copy; {new Date().getFullYear()} - Employee Management
      </Typography>
    </footer>
  );
}
