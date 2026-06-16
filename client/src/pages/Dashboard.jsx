import StatCard from "../components/ui/StatCard";
import "../styles/dashboard.css";
import PageHeader from "../components/ui/PageHeader";

export default function Dashboard() {
  return (
    <div className="app-page">

      <PageHeader
        title="Dashboard"
        subtitle="Overview of your inventory system"
      />

      {/* KPI CARDS */}
      <div className="dashboard-grid">

        <StatCard
          title="Total Users"
          value="128"
          subtitle="Active system users"
          icon="👤"
          color="primary"
        />

        <StatCard
          title="Employees"
          value="54"
          subtitle="Registered employees"
          icon="🏢"
          color="success"
        />

        <StatCard
          title="Assets"
          value="312"
          subtitle="Total inventory items"
          icon="💻"
          color="primary"
        />

        <StatCard
          title="Pending Requests"
          value="7"
          subtitle="Awaiting approval"
          icon="📩"
          color="warning"
        />

      </div>

      {/* OPTIONAL SECOND ROW */}
      <div className="card">
        <h2>Recent Activity</h2>
        <p className="page-subtitle">
          (We’ll turn this into a real activity feed later)
        </p>
      </div>

    </div>
  );
}
