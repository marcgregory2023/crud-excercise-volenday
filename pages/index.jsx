import { Box } from "@mui/material";

import EmployeeTable from "../components/ui/EmployeeTable";
import fetchEmployees from "../config/axios";

export default function HomePage({ employees }) {
  return (
    <Box>
      <EmployeeTable employees={employees} />
    </Box>
  );
}

export async function getServerSideProps() {
  const { data } = await fetchEmployees.get(
    "/api/employees",
    process.env.BASE_URL
  );

  return {
    props: { employees: data },
  };
}
