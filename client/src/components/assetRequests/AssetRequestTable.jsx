import { completeAssetRequest, deleteAssetRequest } from "../../api/assetRequestApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 

export default function AssetRequestTable({requests, onRefresh}) {

    const activeRequests = requests.filter(x => !x.RequestCompleted);
    const completedRequests = requests.filter(x => x.RequestCompleted);

  const handleComplete = async (id) => {

    await completeAssetRequest(id);

    onRefresh();

  };

const handleDelete = async (id) => {
  if (!window.confirm("Delete request?")) {
    return;
  }

  try {
    await deleteAssetRequest(id);
    toast.success("Asset request deleted successfully");
    onRefresh();

  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete asset request");
  }
};

  return (

<>
    <h2>Active Requests</h2>

    <table border="1" cellPadding="8">

    <thead>
        <tr>
        <th>Employee</th>
        <th>Asset Type</th>
        <th>Requested Via</th>
        <th>Date Requested</th>
        <th>Notes</th>
        <th>Actions</th>
        </tr>
    </thead>

    <tbody>

        {activeRequests.map(request => (

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

            <td>

            <button
                onClick={() =>
                handleComplete(request.Id)
                }
            >
                Complete
            </button>

            <button
                onClick={() =>
                handleDelete(request.Id)
                }
            >
                Delete
            </button>

            </td>

        </tr>

        ))}

    </tbody>
    </table>

    <br />
    <br />

    <h2>Completed Requests</h2>

    <table border="1" cellPadding="8">

    <thead>
        <tr>
        <th>Employee</th>
        <th>Asset Type</th>
        <th>Requested Via</th>
        <th>Approved By</th>
        <th>Approved On</th>
        <th>Notes</th>
        </tr>
    </thead>

    <tbody>

        {completedRequests.map(request => (

        <tr key={request.Id}>

            <td>{request.EmployeeName}</td>

            <td>{request.AssetTypeName}</td>

            <td>{request.RequestedVia}</td>

            <td>{request.ApprovedBy}</td>

            <td>{request.ApprovedOn}</td>

            <td>{request.Notes}</td>

        </tr>

        ))}

    </tbody>

    </table>
</>

  );

}


