import DataTable from "../ui/DataTable";

export default function AssignedAssetsTable({ assets }) {

  const columns = [
    { key: "assetTag", label: "Asset Tag" },
    { key: "assetType", label: "Asset Type" },
    { key: "employee", label: "Assigned To" },
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "status", label: "Status" }
  ];

  return (
    <DataTable
      columns={columns}
      data={assets}
      emptyMessage="No assigned assets found"
      renderRow={(asset) => (
        <tr key={asset.Id}>

          <td>{asset.AssetTag}</td>

          <td>{asset.AssetTypeName}</td>

          <td>{asset.EmployeeName}</td>

          <td>{asset.Make}</td>

          <td>{asset.Model}</td>

          <td>{asset.Status}</td>

        </tr>
      )}
    />
  );
}