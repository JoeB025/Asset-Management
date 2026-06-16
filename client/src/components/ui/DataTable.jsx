export default function DataTable({
  data,
  renderRow,
  emptyMessage = "No data found"
}) {
  if (!data || data.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <table border="1" cellPadding="8" width="100%">
      <tbody>
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
}