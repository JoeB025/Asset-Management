import { useState } from "react";
import { disableUser } from "../../api/userApi";
import ResetPasswordForm from "./ResetPasswordForm";

export default function UserTable({ users, onRefresh }) {
  const [resetUserId, setResetUserId] = useState(null);

  const handleDisable = async (id) => {
    const confirmed = window.confirm("Disable user?");
    if (!confirmed) return;

    await disableUser(id);
    onRefresh();
  };

  return (
    <>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Username (Display)</th>
            <th>Email</th>
            <th>Employee</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.Id}>
              <td>{user.Username}</td>
              <td>{user.EmailAddress}</td>
              <td>{user.EmployeeName}</td>
              <td>{user.Role}</td>
              <td>{user.IsActive ? "Yes" : "No"}</td>

              <td>
                <button onClick={() => setResetUserId(user.Id)}>
                  Reset Password
                </button>{" "}

                {user.IsActive === 1 && (
                  <button onClick={() => handleDisable(user.Id)}>
                    Disable
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {resetUserId && (
        <div style={{ marginTop: "20px" }}>
          <h3>Reset Password</h3>

          <ResetPasswordForm
            userId={resetUserId}
            onClose={() => setResetUserId(null)}
          />
        </div>
      )}
    </>
  );
}