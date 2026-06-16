import { useEffect, useState } from "react";
import { getEmployees } from "../../api/employeeApi";
import { getAssetTypes } from "../../api/assetTypeApi";
import { createAssetRequest } from "../../api/assetRequestApi";
import { toast } from "react-toastify";
import "../../styles/forms.css";

export default function AssetRequestForm({ onCreated }) {

  const [employees, setEmployees] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);

  const [form, setForm] = useState({
    EmployeeId: "",
    AssetTypeId: "",
    RequestedVia: "",
    Notes: ""
  });

  useEffect(() => {
    const loadData = async () => {
      const employeeData = await getEmployees();
      const assetTypeData = await getAssetTypes();

      setEmployees(employeeData);
      setAssetTypes(assetTypeData);
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAssetRequest({
        ...form,
        DateOfRequest: new Date().toISOString()
      });

      toast.success("Asset request created successfully");
      onCreated();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create asset request"
      );
    }
  };

    return (
    <div className="card">

      <h3>Create Request</h3>

      <form className="form" onSubmit={handleSubmit}>

        {/* Employee */}
        <div className="form-group">
          <label>Employee</label>
          <select
            name="EmployeeId"
            value={form.EmployeeId}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee.Id} value={employee.Id}>
                {employee.FirstName} {employee.LastName}
              </option>
            ))}
          </select>
        </div>

        {/* Asset Type */}
        <div className="form-group">
          <label>Asset Type</label>
          <select
            name="AssetTypeId"
            value={form.AssetTypeId}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Asset Type</option>

            {assetTypes.map((type) => (
              <option key={type.Id} value={type.Id}>
                {type.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Requested Via */}
        <div className="form-group">
          <label>Requested Via</label>

          <select
            name="RequestedVia"
            value={form.RequestedVia}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Requested Via</option>
            <option value="Email">Email</option>
            <option value="Teams">Teams</option>
            <option value="Verbal">Verbal</option>
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Notes</label>

          <textarea
            name="Notes"
            value={form.Notes}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Create Request
          </button>
        </div>

      </form>
    </div>
  );
}