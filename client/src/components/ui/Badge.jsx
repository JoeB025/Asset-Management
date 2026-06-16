export default function Badge({ type = "default", children }) {

  const styles = {
    success: { background: "#e6f7ee", color: "#1f7a4d" },
    danger: { background: "#fde8e8", color: "#c53030" },
    warning: { background: "#fff4e5", color: "#b7791f" },
    default: { background: "#f1f1f1", color: "#555" }
  };

  return (
    <span style={{
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 600,
      ...styles[type]
    }}>
      {children}
    </span>
  );
}