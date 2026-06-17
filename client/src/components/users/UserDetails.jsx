import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../api/userApi";
import { toast } from "react-toastify";
import PageHeader from "../ui/PageHeader";
import Badge from "../ui/Badge";

export default function UserDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    EmailAddress: "",
    Username: "",
    Role: "",
    EmployeeName: "",
    IsActive: 1
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(id);

        setForm({
          EmailAddress: data.EmailAddress || "",
          Username: data.Username || "",
          Role: data.Role || "",
          EmployeeName: data.EmployeeName || "",
          IsActive: data.IsActive
        });

      } catch (err) {
        toast.error(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, form);
      toast.success("User updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="app-page">Loading...</div>;
  }

  return (
    <div className="app-page">

      <PageHeader
        title="User Details"
        subtitle={`Editing ${form.Username || ""}`}
      />

      <div className="card">

        {/* STATUS STRIP */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <Badge type={form.IsActive ? "success" : "danger"}>
            {form.IsActive ? "Active" : "Disabled"}
          </Badge>

          {form.EmployeeName && (
            <span style={{ fontSize: "13px", opacity: 0.7 }}>
              Employee: {form.EmployeeName}
            </span>
          )}
        </div>

        <form className="form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-input"
              name="EmailAddress"
              value={form.EmailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              className="form-input"
              name="Username"
              value={form.Username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              className="form-select"
              name="Role"
              value={form.Role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}