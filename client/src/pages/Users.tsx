import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";
import { getUsers } from "../api/userApi";

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

    <Layout>

      <h1>
        Users
      </h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add User"}
      </button>

      <br />
      <br />

      {showForm && (

        <UserForm onCreated={() => {setShowForm(false);
            loadUsers();
          }}
        />

      )}

      <UserTable
        users={users}
        onRefresh={
          loadUsers
        }
      />
    </Layout>
  );
}