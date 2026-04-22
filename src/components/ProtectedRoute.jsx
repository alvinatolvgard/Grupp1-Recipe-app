import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

/**
 * En komponent som ser till att man måste vara inloggad för att se innehållet.
 * @author Sanel
 */

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    // Om användaren inte är inloggad, skicka dem till login-sidan.
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    //Om de är inloggade, visa sidan.
    return children;
};

export default ProtectedRoute;