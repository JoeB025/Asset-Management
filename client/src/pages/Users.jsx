import { useEffect, useState } from "react";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";
import { getUsers } from "../api/userApi";
import PageHeader from "../components/ui/PageHeader"; 

export default function Users() {

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {

      const data = await getUsers();
      setUsers(data);
    };



  useEffect(() => {

    loadUsers();

  }, []);

  return (
    <div className="app-page">

      <PageHeader
        title="Users"
        subtitle="Manage system users and permissions"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add User"}
          </button>
        }
      />

      {showForm && (
        <div className="card">
          <UserForm
            onCreated={() => {
              setShowForm(false);
              loadUsers();
            }}
          />
        </div>
      )}

      <UserTable
        users={users}
        onRefresh={loadUsers}
      />

    </div>
  );
}