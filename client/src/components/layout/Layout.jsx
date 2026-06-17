import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailAddress");
    localStorage.removeItem("displayName");
    navigate("/login");
  };

  const displayName = localStorage.getItem("displayName"); 
  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-title">
          Asset-Management  
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/"
            className={`sidebar-link ${isActive("/") ? "active" : ""}`}
          >
            Dashboard
          </Link>

          <Link
            to="/inventory"
            className={`sidebar-link ${isActive("/inventory") ? "active" : ""}`}
          >
            Inventory
          </Link>

          <Link
            to="/employees"
            className={`sidebar-link ${isActive("/employees") ? "active" : ""}`}
          >
            Employees
          </Link>

          <Link
            to="/asset-types"
            className={`sidebar-link ${isActive("/asset-types") ? "active" : ""}`}
          >
            Asset Types
          </Link>

          <Link
            to="/asset-requests"
            className={`sidebar-link ${isActive("/asset-requests") ? "active" : ""}`}
          >
            Asset Requests
          </Link>

          <Link
            to="/users"
            className={`sidebar-link ${isActive("/users") ? "active" : ""}`}
          >
            Users
          </Link>


          <Link 
            to="/inventory/assigned"
            className={`sidebar-link ${isActive("/users") ? "active" : ""}`}
          >
            Assigned Assets 
          </Link>

          <Link 
            to="/inventory/available"
            className={`sidebar-link ${isActive("/inventory/available") ? "active" : ""}`}
          >
            Unassigned Assets
          </Link>

          <Link
            to="/deleted-assets"
            className={`sidebar-link ${isActive("/deleted-assets") ? "active" : ""}`}
          >
            Deleted Assets
          </Link>

        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">

          <div style={{ fontSize: "12px", opacity: 0.8 }}>
            Logged in as
          </div>

          <div style={{ fontWeight: 600, marginBottom: "12px" }}>
            {displayName}
          </div>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        {children}
      </main>

    </div>
  );
}