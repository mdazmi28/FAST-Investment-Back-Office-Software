
import { Navigate } from 'react-router-dom';
import Form from '../components/Form';
import useCheckAuthorized from '../CheckAuthorized';  // Updated import to use the custom hook
import Spinner from 'react-bootstrap/Spinner';

function Login() {
    const isAuthorized = useCheckAuthorized();  // Use the custom hook

    if (isAuthorized === null) {
        return <div>

            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />


        </div>;  
    }

    if (isAuthorized) {
        return <Navigate to="/" />;  // Redirect to home page if authorized
    }

    return <Form route="/api/token/" method="login" />;  // Show login form if not authorized
}

export default Login;
