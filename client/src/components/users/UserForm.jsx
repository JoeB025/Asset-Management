import { useEffect, useState } from "react";
import { createUser } from "../../api/userApi";
import { getEmployees } from "../../api/employeeApi";
import { toast } from "react-toastify";

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
      toast.success("User created successfully");

      setForm({
        EmployeeId: "",
        EmailAddress: "",
        Username: "",
        Password: "",
        Role: "User",
      });

      onCreated();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user");
    }
  };

return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >

      <h3>Create User</h3>

      <div className="form-group">

        <label>Employee</label>

        <select
          className="form-select"
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
            <option
              key={emp.Id}
              value={emp.Id}
            >
              {emp.FirstName} {emp.LastName}
            </option>
          ))}
        </select>

      </div>

      <div className="form-group">

        <label>Email Address</label>

        <input
          className="form-input"
          type="email"
          value={form.EmailAddress}
          onChange={(e) =>
            setForm({
              ...form,
              EmailAddress: e.target.value,
            })
          }
        />

      </div>

      <div className="form-group">

        <label>Display Name</label>

        <input
          className="form-input"
          value={form.Username}
          onChange={(e) =>
            setForm({
              ...form,
              Username: e.target.value,
            })
          }
        />

      </div>

      <div className="form-group">

        <label>Password</label>

        <input
          className="form-input"
          type="password"
          value={form.Password}
          onChange={(e) =>
            setForm({
              ...form,
              Password: e.target.value,
            })
          }
        />

      </div>

      <div className="form-group">

        <label>Role</label>

        <select
          className="form-select"
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

      </div>

      <div className="form-actions">

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create User
        </button>

      </div>

    </form>
  );
}