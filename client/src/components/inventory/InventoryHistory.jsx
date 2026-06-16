import { useEffect, useState } from "react";
import { getInventoryHistory } from "../../api/inventoryApi";
import DataTable from "../ui/DataTable";
import Loader from "../ui/Loader";

export default function InventoryHistory({ inventoryId }) {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadHistory = async () => {
      try {
        const data = await getInventoryHistory(inventoryId);
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoading(false);
      }
    };

    if (inventoryId) {
      loadHistory();
    }

  }, [inventoryId]);

  if (loading) {
    return <Loader text="Loading history..." />;
  }

  const columns = [
    { key: "action", label: "Action" },
    { key: "oldEmployee", label: "Old Employee" },
    { key: "newEmployee", label: "New Employee" },
    { key: "notes", label: "Notes" },
    { key: "date", label: "Date" }
  ];

  return (
    <div>

      <h3>Asset History</h3>

      <DataTable
        columns={columns}
        data={history}
        emptyMessage="No history found"
        renderRow={(item) => (
          <tr key={item.Id}>

            <td>{item.ActionType}</td>
            <td>{item.OldEmployeeName || "-"}</td>
            <td>{item.NewEmployeeName || "-"}</td>
            <td>{item.Notes}</td>
            <td>{item.CreatedOn}</td>

          </tr>
        )}
      />

    </div>
  );
}