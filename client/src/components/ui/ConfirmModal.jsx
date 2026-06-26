import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel
}) {

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
    >

      <p style={{ marginBottom: "20px" }}>
        {message}
      </p>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Confirm
        </button>
      </div>

    </Modal>
  );
}