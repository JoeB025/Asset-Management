export default function EmptyState({
  title = "No data found",
  message = "There is nothing to display right now.",
  action
}) {
  return (
    <div className="empty-state">

      <h3>{title}</h3>

      <p>{message}</p>

      {action && (
        <div style={{ marginTop: "16px" }}>
          {action}
        </div>
      )}

    </div>
  );
}