import { completeAssetRequest, deleteAssetRequest} from "../../api/assetRequestApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import ConfirmModal from "../ui/ConfirmModal";
import { useState } from "react";

export default function AssetRequestTable({ requests, onRefresh }) {

  const [deleteId, setDeleteId] = useState(null);

  const activeRequests = requests.filter(x => !x.RequestCompleted);
  const completedRequests = requests.filter(x => x.RequestCompleted);

  const handleComplete = async (id) => {
    try {
      await completeAssetRequest(id);
      toast.success("Request completed");
      onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAssetRequest(deleteId);
      toast.success("Request deleted");
      setDeleteId(null);
      onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const columnsActive = [
    { key: "employee", label: "Employee" },
    { key: "asset", label: "Asset Type" },
    { key: "via", label: "Requested Via" },
    { key: "date", label: "Date Requested" },
    { key: "notes", label: "Notes" },
    { key: "actions", label: "Actions" }
  ];

  const columnsCompleted = [
    { key: "employee", label: "Employee" },
    { key: "asset", label: "Asset Type" },
    { key: "via", label: "Requested Via" },
    { key: "approvedBy", label: "Approved By" },
    { key: "approvedOn", label: "Approved On" },
    { key: "notes", label: "Notes" }
  ];

  return (
    <>

      {/* ACTIVE REQUESTS */}
      <h2>Active Requests</h2>

      <DataTable
        columns={columnsActive}
        data={activeRequests}
        emptyMessage="No active requests"
        renderRow={(request) => (
          <tr key={request.Id}>

            <td>
              <Link to={`/employees/${request.EmployeeId}`}>
                {request.EmployeeName}
              </Link>
            </td>

            <td>{request.AssetTypeName}</td>

            <td>{request.RequestedVia}</td>

            <td>{request.DateOfRequest}</td>

            <td>{request.Notes}</td>

            <td style={{ display: "flex", gap: "8px" }}>

              <button
                className="btn btn-secondary"
                onClick={() => handleComplete(request.Id)}
              >
                Complete
              </button>

              <button
                className="btn btn-danger"
                onClick={() => setDeleteId(request.Id)}
              >
                Delete
              </button>

            </td>

          </tr>
        )}
      />

      <br /><br />

      {/* COMPLETED REQUESTS */}
      <h2>Completed Requests</h2>

      <DataTable
        columns={columnsCompleted}
        data={completedRequests}
        emptyMessage="No completed requests"
        renderRow={(request) => (
          <tr key={request.Id}>

            <td>{request.EmployeeName}</td>
            <td>{request.AssetTypeName}</td>
            <td>{request.RequestedVia}</td>
            <td>{request.ApprovedBy}</td>
            <td>{request.ApprovedOn}</td>
            <td>{request.Notes}</td>

          </tr>
        )}
      />

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Asset Request"
        message="Are you sure you want to delete this request?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

    </>
  );
}