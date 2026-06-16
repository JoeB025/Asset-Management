import { useState } from "react";
import { disableUser } from "../../api/userApi";
import ResetPasswordForm from "./ResetPasswordForm";

import DataTable from "../ui/DataTable";
import ConfirmModal from "../ui/ConfirmModal";
import Badge from "../ui/Badge";

export default function UserTable({ users, onRefresh }) {

  const [resetUserId, setResetUserId] = useState(null);
  const [confirmUserId, setConfirmUserId] = useState(null);

  const handleDisable = async () => {
    await disableUser(confirmUserId);
    setConfirmUserId(null);
    onRefresh();
  };

  return (
    <>
      <DataTable
        data={users}
        emptyMessage="No users found"
        renderRow={(user) => (
          <tr key={user.Id}>

            <td>{user.Username}</td>
            <td>{user.EmailAddress}</td>
            <td>{user.EmployeeName}</td>
            <td>{user.Role}</td>

            {/* STATUS */}
            <td>
              <Badge type={user.IsActive ? "success" : "danger"}>
                {user.IsActive ? "Active" : "Disabled"}
              </Badge>
            </td>

            {/* ACTIONS */}
            <td style={{ display: "flex", gap: "8px" }}>

              <button
                className="btn btn-secondary"
                onClick={() => setResetUserId(user.Id)}
              >
                Reset Password
              </button>

              {user.IsActive === 1 && (
                <button
                  className="btn btn-danger"
                  onClick={() => setConfirmUserId(user.Id)}
                >
                  Disable
                </button>
              )}

            </td>

          </tr>
        )}
      />

      {/* RESET PASSWORD INLINE PANEL */}
      {resetUserId && (
        <div style={{ marginTop: "20px" }}>
          <ResetPasswordForm
            userId={resetUserId}
            onClose={() => setResetUserId(null)}
          />
        </div>
      )}

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={!!confirmUserId}
        title="Disable User"
        message="Are you sure you want to disable this user?"
        onCancel={() => setConfirmUserId(null)}
        onConfirm={handleDisable}
      />
    </>
  );
}