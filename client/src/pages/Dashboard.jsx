import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import Layout from "../components/layout/Layout";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data = await getDashboard();
        setStats(data);

      } catch (error) {

        console.error("Dashboard load failed", error);

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (

    <Layout>
    {    
    <div>
      <h1>Dashboard</h1>

      <div>
        <h3>Total Assets</h3>
        <p>{stats?.totalAssets}</p>
      </div>

      <div>
        <h3>Assigned Assets</h3>
        <p>{stats?.assignedAssets}</p>
      </div>

      <div>
        <h3>Unassigned Assets</h3>
        <p>{stats?.unassignedAssets}</p>
      </div>

      <div>
        <h3>Deleted Assets</h3>
        <p>{stats?.deletedAssets}</p>
      </div>

      <div>
        <h3>Employees</h3>
        <p>{stats?.employees}</p>
      </div>

      <div>
        <h3>Asset Types</h3>
        <p>{stats?.assetTypes}</p>
      </div>

    </div>

    }
    </Layout>
  );
}