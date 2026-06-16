import { useEffect, useState } from "react";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeTable from "../components/employee/EmployeeTable";
import { getEmployees } from "../api/employeeApi";
import PageHeader from "../components/ui/PageHeader";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

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
    return <Loader text="Loading employees..." />;
  }

  return (
    <div className="app-page">

      <PageHeader
        title="Employees"
        subtitle="Manage company employees and assignments"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Employee"}
          </button>
        }
      />

      {showForm && (
        <div className="card">
          <EmployeeForm
            onCreated={async () => {
              await loadEmployees();
              setShowForm(false);
            }}
          />
        </div>
      )}

      {employees.length === 0 ? (
        <EmptyState
          title="No Employees"
          message="No employees have been added yet."
        />
      ) : (
        <EmployeeTable
          employees={employees}
          onRefresh={loadEmployees}
        />
      )}

    </div>
  );
}