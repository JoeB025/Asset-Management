import { deleteEmployee } from "../../api/employeeApi";
import { Link } from "react-router-dom";

export default function EmployeeRow({ employee, onRefresh }) {

  const handleDelete = async () => {

    const confirmed = window.confirm(
      `Delete ${employee.FirstName} ${employee.LastName}?`
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteEmployee(employee.Id);

      onRefresh();

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <tr>

      <td>{employee.Id}</td>

      <td>
        {employee.FirstName} {employee.LastName}
      </td>

      <td>{employee.JobTitle}</td>

      <td>{employee.Team}</td>

      <td>{employee.Email}</td>

      <td>
        {employee.WorksFromHome ? "Yes" : "No"}
      </td>

      <td>
        <Link to={`/employees/${employee.Id}`}>
          View
        </Link>
        {" "}
        
        <button onClick={handleDelete}>
          Delete
        </button>
      </td>

    </tr>
  );
}