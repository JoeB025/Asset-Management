import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; 
import "./index.css"; 
import "./styles/theme.css"; 
import "./styles/tables.css";
import "./styles/buttons.css"; 
import "./styles/ui.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);





