import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({ employees, onRefresh }) {

  return (
    <table border="1" cellPadding="8">

      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Job Title</th>
          <th>Team</th>
          <th>Email</th>
          <th>WFH</th>
        </tr>
      </thead>

      <tbody>

        {employees.map(employee => (
          <EmployeeRow
            key={employee.Id}
            employee={employee}
            onRefresh={onRefresh}
          />
        ))}

      </tbody>

    </table>
  );

}