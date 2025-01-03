import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode
import SecureLS from "secure-ls"; // SecureLS import

// Initialize SecureLS instance
const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = ls.get('kyttoken'); // Get token from secure localStorage
    console.log(token, "Tokenwert");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp > currentTime) {
          // Token is valid
          setIsAuthenticated(true);
        } else {
          // Token has expired
          console.error("Token has expired.");
          ls.remove('token'); 
          ls.clear(); // Optional: Clear expired token
          navigate('/');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        ls.remove('token');
        ls.clear(); // Optional: Clear invalid token
        navigate('/');
      }
    } else {
      // Token not found
      console.warn("No token found.");

      navigate('/');
    }
  }, [navigate]);

  // Render the protected component if authenticated
  return isAuthenticated && <props.component/>;
};

export default ProtectedRoute;
