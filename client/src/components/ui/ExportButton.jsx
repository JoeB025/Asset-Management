// import React from "react";

export default function ExportButton({
  onClick,
  text = "Export",
  className = ""
}) {
  return (
    <button
      type="button"
      className={`btn btn-secondary ${className}`}
      onClick={onClick}
    >
      📊 {text}
    </button>
  );
}