import { useEffect, useState } from "react";
import { createUser } from "../../api/userApi";
import { getEmployees } from "../../api/employeeApi";

export default function UserForm({ onCreated }) {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    EmployeeId: "",
    EmailAddress: "",
    Username: "",
    Password: "",
    Role: "User",
  });

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(form);

      setForm({
        EmployeeId: "",
        EmailAddress: "",
        Username: "",
        Password: "",
        Role: "User",
      });

      onCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create User</h3>

      {/* Employee */}
      <label>
        Employee
      </label>
      <br />
      <select
        value={form.EmployeeId}
        onChange={(e) =>
          setForm({
            ...form,
            EmployeeId: e.target.value,
          })
        }
      >
        <option value="">Select Employee</option>

        {employees.map((emp) => (
          <option key={emp.Id} value={emp.Id}>
            {emp.FirstName} {emp.LastName}
          </option>
        ))}
      </select>

      <br /><br />

      {/* Email */}
      <label>
        Email Address
      </label>
      <br />
      <input
        type="email"
        value={form.EmailAddress}
        onChange={(e) =>
          setForm({
            ...form,
            EmailAddress: e.target.value,
          })
        }
      />

      <br /><br />

      {/* Display Name */}
      <label>
        Display Name
      </label>
      <br />
      <input
        value={form.Username}
        onChange={(e) =>
          setForm({
            ...form,
            Username: e.target.value,
          })
        }
      />

      <br /><br />

      {/* Password */}
      <label>
        Password
      </label>
      <br />
      <input
        type="password"
        value={form.Password}
        onChange={(e) =>
          setForm({
            ...form,
            Password: e.target.value,
          })
        }
      />

      <br /><br />

      {/* Role */}
      <label>
        Role
      </label>
      <br />
      <select
        value={form.Role}
        onChange={(e) =>
          setForm({
            ...form,
            Role: e.target.value,
          })
        }
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <br /><br />

      <button type="submit">
        Create User
      </button>
    </form>
  );
}