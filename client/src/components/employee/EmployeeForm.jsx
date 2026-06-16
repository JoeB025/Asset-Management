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

      toast.success("Employee Successfully Created"); 

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
    <form onSubmit={handleSubmit}>

      <input
        placeholder="First Name"
        value={form.FirstName}
        onChange={(e) =>
          setForm({
            ...form,
            FirstName: e.target.value
          })
        }
      />

      <input
        placeholder="Last Name"
        value={form.LastName}
        onChange={(e) =>
          setForm({
            ...form,
            LastName: e.target.value
          })
        }
      />

        <select
        value={form.JobTitle}
        onChange={(e) =>
            setForm({
            ...form,
            JobTitle: e.target.value
            })
        }
        >
        <option value="">
            Select Job Title
        </option>

        {jobTitles.map(jobTitle => (
            <option
            key={jobTitle}
            value={jobTitle}
            >
            {jobTitle}
            </option>
        ))}
        </select>

        <select
        value={form.Team}
        onChange={(e) =>
            setForm({
            ...form,
            Team: e.target.value
            })
        }
        >
        <option value="">
            Select Team
        </option>

        {teams.map(team => (
            <option
            key={team}
            value={team}
            >
            {team}
            </option>
        ))}
        </select>

      <input
        placeholder="Email"
        value={form.Email}
        onChange={(e) =>
          setForm({
            ...form,
            Email: e.target.value
          })
        }
      />

      <label>
        <input
          type="checkbox"
          checked={form.WorksFromHome}
          onChange={(e) =>
            setForm({
              ...form,
              WorksFromHome: e.target.checked
            })
          }
        />
        Works From Home
      </label>

      <button type="submit">
        Add Employee
      </button>

    </form>
  );
}