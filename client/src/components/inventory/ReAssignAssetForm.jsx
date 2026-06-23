// import { useEffect, useState } from "react";
// import { getEmployees } from "../../api/employeeApi";
// import { reassignInventoryItem } from "../../api/inventoryApi";

// export default function ReassignAssetForm({
//   inventoryId,
//   currentEmployeeId,
//   onClose,
//   onReassigned
// }) {

//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState("");

//   useEffect(() => {

//     const loadEmployees = async () => {
//       const data = await getEmployees();
//       setEmployees(data);
//     };

//     loadEmployees();

//   }, []);

//   const handleSubmit = async () => {

//     if (!selectedEmployee) return;

//     await reassignInventoryItem({
//       InventoryId: inventoryId,
//       OldEmployeeId: currentEmployeeId,
//       NewEmployeeId: selectedEmployee,
//       Notes: "Reassigned from employee page"
//     });

//     onReassigned();
//     onClose();

//   };

//   return (
//     <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>

//       <h4>Reassign Asset</h4>

//       <select
//         value={selectedEmployee}
//         onChange={(e) => setSelectedEmployee(e.target.value)}
//       >
//         <option value="">Select Employee</option>

//         {employees.map(emp => (
//           <option key={emp.Id} value={emp.Id}>
//             {emp.FirstName} {emp.LastName}
//           </option>
//         ))}
//       </select>

//       <br /><br />

//       <button className="btn btn-primary" onClick={handleSubmit}>
//         Save
//       </button>

//       <button className="btn btn-danger" onClick={onClose} style={{ marginLeft: "10px" }}>
//         Cancel
//       </button>

//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { getEmployees } from "../../api/employeeApi";
import { reassignInventoryItem } from "../../api/inventoryApi";

export default function ReassignAssetForm({
  inventoryId,
  currentEmployeeId,
  onClose,
  onReassigned
}) {

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {

    const loadEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    loadEmployees();

  }, []);

  const handleSubmit = async () => {

    if (!selectedEmployee) return;

    await reassignInventoryItem({
      InventoryId: inventoryId,
      OldEmployeeId: currentEmployeeId,
      NewEmployeeId: selectedEmployee,
      Notes: "Reassigned from employee page"
    });

    onReassigned();
    onClose();

  };

  return (
    <div className="reassign-form">
      <h4 className="form-title">Reassign Asset</h4>
      <br></br>
      <div className="form-group">
        <select
        className="form-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>

          {employees.map(emp => (
            <option key={emp.Id} value={emp.Id}>
              {emp.FirstName} {emp.LastName}
            </option>
          ))}
        </select>

        <br /><br />

        <div className="button-row">
          <button 
            className="btn btn-primary"
            type="button" 
            onClick={handleSubmit}
          >
            Save
          </button>

          <button 
            className="btn btn-danger"
            type="button" 
            onClick={onClose} 
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}