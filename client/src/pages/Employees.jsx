import { useEffect, useState } from "react";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeTable from "../components/employee/EmployeeTable";
import { getEmployees } from "../api/employeeApi";


export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 

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
      <>
        <h1>Employees</h1>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Employees</h1>
        <button onClick={() => setShowForm(!showForm)}>      
          {showForm ? "Cancel" : "Add Employee"}
        </button>

        {showForm && (
          <EmployeeForm onCreated={async () => { await loadEmployees(); setShowForm(false); }}/>
        )}
      
      <hr />
      
      <EmployeeTable
        employees={employees}
        onRefresh={loadEmployees}
      />
    </>
  );
}