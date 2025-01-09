import { XamanAuth } from './services/xamanAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!XamanAuth.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Add other protected routes */}
      </Routes>
    </Router>
  );
}
