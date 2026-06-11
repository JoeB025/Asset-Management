import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <aside
        style={{
          width: "220px",
          padding: "20px",
          borderRight: "1px solid #ddd"
        }}
      >
        <h2>Inventory</h2>

        <nav>
          <p><Link to="/">Dashboard</Link></p>
          <p><Link to="/inventory">Inventory</Link></p>
          <p><Link to="/employees">Employees</Link></p>
          <p><Link to="/asset-types">Asset Types</Link></p>
          <p><Link to="/broken">Broken</Link></p>


        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "20px"
        }}
      >
        {children}
      </main>

    </div>
  );
}