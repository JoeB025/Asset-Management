import DataTable from "../ui/DataTable";

export default function UnassignedAssetsTable({ assets }) {

  const columns = [
    { key: "assetTag", label: "Asset Tag" },
    { key: "assetType", label: "Asset Type" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "serialNumber", label: "Serial Number" },
    { key: "status", label: "Status" }
  ];

  return (
    <DataTable
      columns={columns}
      data={assets}
      emptyMessage="No available assets found"
      renderRow={(asset) => (
        <tr key={asset.Id}>

          <td>{asset.AssetTag}</td>

          <td>
            {asset.AssetTypeName || "-"}
          </td>

          <td>
            {asset.Manufacturer || "-"}
          </td>

          <td>
            {asset.SerialNumber || "-"}
          </td>

          <td>
            {asset.Status}
          </td>

        </tr>
      )}
    />
  );
}