import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import Recognition from './pages/Recognition';
import Convert from './pages/Convert';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import AuthGuard from './components/AuthGuard';
import { useAuthStore } from './store/authStore';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminRewards from './pages/admin/Rewards';
import AdminCampaigns from './pages/admin/Campaigns';
import AdminSettings from './pages/admin/Settings';

export default function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace /> : <Login />
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AuthGuard allowedRoles={['admin']}>
            <AdminLayout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="rewards" element={<AdminRewards />} />
                <Route path="campaigns" element={<AdminCampaigns />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </AdminLayout>
          </AuthGuard>
        } />

        {/* User Routes */}
        <Route path="/" element={
          <AuthGuard>
            <Layout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="recognition" element={<Recognition />} />
                <Route path="convert" element={<Convert />} />
                <Route path="settings" element={
                  <AuthGuard allowedRoles={['admin']}>
                    <Settings />
                  </AuthGuard>
                } />
              </Routes>
            </Layout>
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
}