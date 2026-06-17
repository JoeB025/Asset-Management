import { useEffect, useState } from "react";
import { getAssignedInventory, getAssignedInventoryFiltered } from "../api/inventoryApi";
import { getEmployees } from "../api/employeeApi";
import { getAssetTypes } from "../api/assetTypeApi";
import PageHeader from "../components/ui/PageHeader";
import AssignedAssetsTable from "../components/assignedAssets/AssignedAssetsTable";

export default function AssignedAssets() {

  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");

  const loadData = async () => {

    const [
      assetData,
      employeeData,
      assetTypeData
    ] = await Promise.all([
      getAssignedInventory(),
      getEmployees(),
      getAssetTypes()
    ]);

    setAssets(assetData);
    setEmployees(employeeData);
    setAssetTypes(assetTypeData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilter = async () => {

    const data = await getAssignedInventoryFiltered(
      selectedEmployee,
      selectedAssetType
    );

    setAssets(data);
  };

  const clearFilters = async () => {

    setSelectedEmployee("");
    setSelectedAssetType("");

    const data = await getAssignedInventory();
    setAssets(data);
  };

  return (
    <div className="app-page">

      <PageHeader
        title="Assigned Assets"
        subtitle="View and manage assigned inventory"
      />

      <div className="card">

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "end"
          }}
        >

          <div className="form-group">
            <label>Employee</label>

            <select
              className="form-select"
              value={selectedEmployee}
              onChange={(e) =>
                setSelectedEmployee(e.target.value)
              }
            >
              <option value="">All Employees</option>

              {employees.map(employee => (
                <option
                  key={employee.Id}
                  value={employee.Id}
                >
                  {employee.FirstName} {employee.LastName}
                </option>
              ))}
            </select>

          </div>

          <div className="form-group">
            <label>Asset Type</label>

            <select
              className="form-select"
              value={selectedAssetType}
              onChange={(e) =>
                setSelectedAssetType(e.target.value)
              }
            >
              <option value="">All Asset Types</option>

              {assetTypes.map(type => (
                <option
                  key={type.Id}
                  value={type.Id}
                >
                  {type.Name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleFilter}
          >
            Apply Filters
          </button>

          <button
            className="btn btn-secondary"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>
      <AssignedAssetsTable assets={assets} />
    </div>
  );
}