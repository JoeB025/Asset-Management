import { useEffect, useState } from "react";
import StatCard from "../components/ui/StatCard";
import PageHeader from "../components/ui/PageHeader";
import { getDashboard } from "../api/dashboardApi";
import Loader from "../components/ui/Loader";

import "../styles/dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboard();
        setStats(data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="app-page">

      <PageHeader
        title="Dashboard"
        subtitle="Overview of your inventory system"
      />

      {/* KPI CARDS */}
      <div className="dashboard-grid">

        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          subtitle="All inventory items"
          icon="💻"
          color="primary"
        />

        <StatCard
          title="Assigned Assets"
          value={stats.assignedAssets}
          subtitle="Currently allocated"
          icon="📦"
          color="success"
        />

        <StatCard
          title="Unassigned Assets"
          value={stats.unassignedAssets}
          subtitle="Available stock"
          icon="📂"
          color="warning"
        />

        <StatCard
          title="Employees"
          value={stats.employees}
          subtitle="Active employees"
          icon="🏢"
          color="primary"
        />

      </div>

      {/* SECOND ROW */}
      <div className="dashboard-grid">

        <StatCard
          title="Deleted Assets"
          value={stats.deletedAssets}
          subtitle="Removed from system"
          icon="🗑️"
          color="danger"
        />

        <StatCard
          title="Asset Types"
          value={stats.assetTypes}
          subtitle="Categories in system"
          icon="🏷️"
          color="primary"
        />

      </div>

      {/* PLACEHOLDER SECTION */}
      <div className="card">
        <h2>Recent Activity</h2>
        <p className="page-subtitle">
          <ul>
            <li>Turn this section into a live feed and show recent additions i.e new employees added or something yada yada yada</li>
            <li>Add links to the dashboard to the relevant pages.</li>
            <li>Add in a page to show all unassigned assets and a link to it</li>
            <li>Add in a page to all the assigned Assets</li>
            <li>Add in something to say ... We do not have enough of x asset?</li>
            <li>Fix the Logout text - Should show users name.</li>
            <li>Create a page for the users so email addresses / names can be edited</li>
            <li>Add in a branding logo somewhere</li>
          </ul>
        </p>
      </div>

    </div>
  );
}