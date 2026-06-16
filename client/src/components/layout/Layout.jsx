// import { Link, useNavigate } from "react-router-dom";

// export default function Layout({ children }) {

//  const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");

//   };



//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>

//       <aside
//         style={{
//           width: "220px",
//           padding: "20px",
//           borderRight: "1px solid #ddd"
//         }}
//       >
//         <h2>Inventory</h2>

//         <nav>
//           <p><Link to="/">Dashboard</Link></p>
//           <p><Link to="/inventory">Inventory</Link></p>
//           <p><Link to="/employees">Employees</Link></p>
//           <p><Link to="/asset-types">Asset Types</Link></p>
//           <p><Link to="/deleted-assets">Deleted Assets</Link></p>
//           <p><Link to="/asset-requests">Asset Requests</Link></p>
//           <p><Link to="/users">Users</Link></p>
//           <hr />


//           <p>Logged in as:<br />
//             <strong>
//               {localStorage.getItem("username")}
//             </strong>
//           </p>
//           <button onClick={handleLogout}>Logout</button> 
//         </nav>
//       </aside>

//       <main
//         style={{
//           flex: 1,
//           padding: "20px"
//         }}
//       >
//         {children}
//       </main>

//     </div>
//   );
// }




import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-title">
          Inventory
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
            to="/deleted-assets"
            className={`sidebar-link ${isActive("/deleted-assets") ? "active" : ""}`}
          >
            Deleted Assets
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

        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">

          <div style={{ fontSize: "12px", opacity: 0.8 }}>
            Logged in as
          </div>

          <div style={{ fontWeight: 600, marginBottom: "12px" }}>
            {localStorage.getItem("username")}
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