import { useEffect, useState } from "react";

import { getEmployees } from "../../api/employeeApi";
import { getAssetTypes } from "../../api/assetTypeApi";

import {
  createAssetRequest
} from "../../api/assetRequestApi";

export default function AssetRequestForm({
  onCreated
}) {

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

      const employeeData =
        await getEmployees();

      const assetTypeData =
        await getAssetTypes();

      setEmployees(employeeData);
      setAssetTypes(assetTypeData);

    };

    loadData();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    await createAssetRequest({

      ...form,

      DateOfRequest:
        new Date().toISOString()

    });

    onCreated();

  };

  return (

    <form onSubmit={handleSubmit}>

      <h3>Create Request</h3>

      <select
        value={form.EmployeeId}
        onChange={(e) =>
          setForm({
            ...form,
            EmployeeId: e.target.value
          })
        }
        required
      >

        <option value="">
          Select Employee
        </option>

        {employees.map(employee => (

          <option
            key={employee.Id}
            value={employee.Id}
          >
            {employee.FirstName} {employee.LastName}
          </option>

        ))}

      </select>

      <br />
      <br />

      <select
        value={form.AssetTypeId}
        onChange={(e) =>
          setForm({
            ...form,
            AssetTypeId: e.target.value
          })
        }
        required
      >

        <option value="">
          Select Asset Type
        </option>

        {assetTypes.map(type => (

          <option
            key={type.Id}
            value={type.Id}
          >
            {type.Name}
          </option>

        ))}

      </select>

      <br />
      <br />

      <select
        value={form.RequestedVia}
        onChange={(e) =>
          setForm({
            ...form,
            RequestedVia: e.target.value
          })
        }
      >

        <option value="">
          Requested Via
        </option>

        <option value="Email">
          Email
        </option>

        <option value="Teams">
          Teams
        </option>

        <option value="Verbal">
          Verbal
        </option>

      </select>

      <br />
      <br />

      <textarea
        placeholder="Notes"
        value={form.Notes}
        onChange={(e) =>
          setForm({
            ...form,
            Notes: e.target.value
          })
        }
      />

      <br />
      <br />

      <button type="submit">
        Create Request
      </button>

    </form>

  );

}