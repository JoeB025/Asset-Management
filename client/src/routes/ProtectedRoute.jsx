// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {

//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;





// now the user should be able to go directly to the requested page after they log in (useful if someone sends a link to them to open a specific page)
// keep the above in case this breaks.... 
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;