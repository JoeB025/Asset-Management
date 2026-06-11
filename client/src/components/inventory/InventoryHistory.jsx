import { useEffect, useState } from "react";
import { getInventoryHistory } from "../../api/inventoryApi";

export default function InventoryHistory({ inventoryId }) {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const data =
          await getInventoryHistory(
            inventoryId
          );

        setHistory(data);

      } catch (error) {

        console.error(
          "Failed to load history",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    if (inventoryId) {
      loadHistory();
    }

  }, [inventoryId]);

  if (loading) {
    return <p>Loading history...</p>;
  }

  if (history.length === 0) {
    return <p>No history found.</p>;
  }

  return (
    <div>

      <h3>Asset History</h3>

      <table
        border="1"
        cellPadding="8"
      >

        <thead>
          <tr>
            <th>Action</th>
            <th>Old Employee</th>
            <th>New Employee</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {history.map(item => (

            <tr key={item.Id}>

              <td>
                {item.ActionType}
              </td>

              <td>
                {item.OldEmployeeName || "-"}
              </td>

              <td>
                {item.NewEmployeeName || "-"}
              </td>

              <td>
                {item.Notes}
              </td>

              <td>
                {item.CreatedOn}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );

}