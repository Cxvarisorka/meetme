import { Navigate } from "react-router";

const ProtectedRoute = ({children, redirectTo, isValid}) => {
    return isValid ? children : <Navigate to={redirectTo}/>
}

export default ProtectedRoute;