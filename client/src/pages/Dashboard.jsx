import { useEffect, useState } from "react";
import StatCard from "../components/ui/StatCard";
import PageHeader from "../components/ui/PageHeader";
import { getDashboard } from "../api/dashboardApi";
import Loader from "../components/ui/Loader";
import { Link } from "react-router-dom"; 
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


      <Link to={"/inventory"}>
        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          subtitle="All inventory items"
          icon="💻"
          color="primary"
        />
      </Link>

      <Link to={"/inventory/assigned"}>
        <StatCard
          title="Assigned Assets"
          value={stats.assignedAssets}
          subtitle="Currently allocated"
          icon="📦"
          color="success"
        />
      </Link>

      <Link to={"/inventory/available"}>
        <StatCard
          title="Unassigned Assets"
          value={stats.unassignedAssets}
          subtitle="Available stock"
          icon="📂"
          color="warning"
        />
      </Link>

      <Link to={"/employees"}>
        <StatCard
          title="Employees"
          value={stats.employees}
          subtitle="Active employees"
          icon="🏢"
          color="primary"
        />
      </Link>
      </div>

      {/* SECOND ROW */}
      <div className="dashboard-grid">

      <Link to={"/asset-types"}>
        <StatCard
          title="Asset Types"
          value={stats.assetTypes}
          subtitle="Categories in system"
          icon="🏷️"
          color="primary"
        />
      </Link>

      <Link to={"/deleted-assets"}>
        <StatCard
          title="Deleted Assets"
          value={stats.deletedAssets}
          subtitle="Removed from system"
          icon="🗑️"
          color="danger"
        />
      </Link>

      </div>

      {/* PLACEHOLDER SECTION */}
      <div className="card">
        <h2>Recent Activity</h2>
        <p className="page-subtitle"> </p>
          <ul>
            <li>Turn this section into a live feed and show recent additions i.e new employees added or something yada yada yada</li>
            <li>Add links to the dashboard to the relevant pages.</li>
            <li>Add in a page to show all unassigned assets and a link to it</li>
            <li>Add in a page to all the assigned Assets</li>
            <li>Add in something to say ... We do not have enough of x asset?</li>
            <li>Fix the Logout text - Should show users name.</li>
            <li>Create a page for the users so email addresses / names can be edited</li>
            <li>Add in a branding logo somewhere</li>
            <li>Add in downloads so a user can download a form or list - could come in handy to take to a stock room / inventory cupboard or something</li>
          </ul> 
      </div>

    </div>
  );
}