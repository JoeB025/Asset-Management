import { useState } from "react";
import { createEmployee } from "../../api/employeeApi";
import { teams } from "../../constants/teams";
import { jobTitles } from "../../constants/jobTitles";
import { toast } from "react-toastify";

export default function EmployeeForm({ onCreated }) {

  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    JobTitle: "",
    Team: "",
    Email: "",
    WorksFromHome: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployee(form);

      toast.success("Employee successfully created");

      setForm({
        FirstName: "",
        LastName: "",
        JobTitle: "",
        Team: "",
        Email: "",
        WorksFromHome: false
      });

      onCreated();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <>
      <h3>Add Employee</h3>
      <form className="form" onSubmit={handleSubmit}>

        {/* FIRST NAME */}
        <div className="form-group">
          <label>First Name</label>
          <input
            className="form-input"
            value={form.FirstName}
            onChange={(e) =>
              setForm({ ...form, FirstName: e.target.value })
            }
            required
          />
        </div>

        {/* LAST NAME */}
        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-input"
            value={form.LastName}
            onChange={(e) =>
              setForm({ ...form, LastName: e.target.value })
            }
            required
          />
        </div>

        {/* JOB TITLE */}
        <div className="form-group">
          <label>Job Title</label>
          <select
            className="form-select"
            value={form.JobTitle}
            onChange={(e) =>
              setForm({ ...form, JobTitle: e.target.value })
            }
            required
          >
            <option value="">Select Job Title</option>
            {jobTitles.map((jobTitle) => (
              <option key={jobTitle} value={jobTitle}>
                {jobTitle}
              </option>
            ))}
          </select>
        </div>

        {/* TEAM */}
        <div className="form-group">
          <label>Team</label>
          <select
            className="form-select"
            value={form.Team}
            onChange={(e) =>
              setForm({ ...form, Team: e.target.value })
            }
            required
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            value={form.Email}
            onChange={(e) =>
              setForm({ ...form, Email: e.target.value })
            }
            required
          />
        </div>

        {/* WFH */}
        <div className="form-group">
          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={form.WorksFromHome}
              onChange={(e) =>
                setForm({ ...form, WorksFromHome: e.target.checked })
              }
            />
            Works From Home
          </label>
        </div>

        {/* ACTIONS */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </div>
      </form>
    </>
  );
}