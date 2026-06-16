import DataTable from "../ui/DataTable";

export default function EmployeeTable({ employees, onRefresh }) {
  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "job", label: "Job Title" },
    { key: "team", label: "Team" },
    { key: "email", label: "Email" },
    { key: "wfh", label: "WFH" },
    { key: "actions", label: "Actions" }
  ];

  return (
    <DataTable
      columns={columns}
      data={employees}
      emptyMessage="No employees found"
      renderRow={(employee) => (
        <tr key={employee.Id}>

          <td>{employee.Id}</td>

          <td>
            {employee.FirstName} {employee.LastName}
          </td>

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
              onClick={() => {
                const confirmed = window.confirm(
                  `Delete ${employee.FirstName} ${employee.LastName}?`
                );
                if (confirmed) {
                  onRefresh();
                }
              }}
            >
              Delete
            </button>
          </td>

        </tr>
      )}
    />
  );
}