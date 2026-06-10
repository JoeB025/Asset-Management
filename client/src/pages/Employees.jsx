import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeTable from "../components/employee/EmployeeTable";
import { getEmployees } from "../api/employeeApi";


export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {

    try {

      const data = await getEmployees();

      setEmployees(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadEmployees();

  }, []);

  if (loading) {
    return (
      <Layout>
        <h1>Employees</h1>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Employees</h1>
        <EmployeeForm onCreated={loadEmployees} />
      <hr />
      <EmployeeTable
        employees={employees}
        onRefresh={loadEmployees}
      />
    </Layout>
  );
}