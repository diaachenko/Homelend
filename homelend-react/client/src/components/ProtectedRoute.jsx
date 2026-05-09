import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, isLoading, children }) {
  if (isLoading) {
    return <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><p>Loading...</p></main>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
}