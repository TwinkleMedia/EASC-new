import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Dashboard from './dashboard/dashboard';
import UploadCourses from './dashboard/page/UploadCourses';
import CouponForm from './dashboard/page/CouponForm';
import DashboardOverview from './dashboard/DashboardOverview';
import Listofcourses from './dashboard/page/Listofcourses';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested routes that will render within the Dashboard component */}
          <Route index element={<DashboardOverview />} />
          <Route path="upload-courses" element={<UploadCourses />} />
          <Route path="create-coupon-code" element={<CouponForm />} />
          <Route path="List-of-courses" element={< Listofcourses />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        {/* Redirect any other routes to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;