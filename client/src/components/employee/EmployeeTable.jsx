import DataTable from "../ui/DataTable";
import { useState } from "react"; 
import ConfirmModal from "../ui/ConfirmModal"; 
import { deleteEmployee } from "../../api/employeeApi";
import { toast } from "react-toastify";

export default function EmployeeTable({ employees, onRefresh }) {

  const [deleteId, setDeleteId] = useState(null); 

  const columns = [
    // { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "job", label: "Job Title" },
    { key: "team", label: "Team" },
    { key: "email", label: "Email" },
    { key: "wfh", label: "WFH" },
    { key: "actions", label: "Actions" }
  ];


const handleDelete = async () => {
  try {
    await deleteEmployee(deleteId); 
    toast.success("Request deleted"); 
    setDeleteId(null); 
    onRefresh(); 
  } catch(error) {
    toast.error(error.response?.data?.message);
  }
};


  return (
  <>
    <DataTable
      columns={columns}
      data={employees}
      emptyMessage="No employees found"
      renderRow={(employee) => (
        <tr key={employee.Id}>
          <td>{employee.FirstName} {employee.LastName}</td>
          <td>{employee.JobTitle}</td>
          <td>{employee.Team}</td>
          <td>{employee.Email}</td>
          <td>
            <span
              style={{
                color: employee.WorksFromHome ? "#28a745" : "#999",
                fontWeight: 600
              }}
            >
              {employee.WorksFromHome ? "Yes" : "No"}
            </span>
          </td>

          <td style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-secondary">
              <a href={`/employees/${employee.Id}`}>View</a>
            </button>


            <button
              className="btn btn-danger"
              onClick={() => setDeleteId(employee.Id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    />
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
  </>
  );
}