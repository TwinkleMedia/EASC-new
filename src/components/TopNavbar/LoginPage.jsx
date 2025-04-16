import LoginSystem from '../components/LoginSystem';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  // Check if user is already logged in
  // This is just a placeholder - replace with your actual authentication check
  const isAuthenticated = false; // Set to true when user is logged in
  
  // If user is already logged in, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-20">
      <LoginSystem />
    </div>
  );
};

export default LoginPage;