import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar/TopNavbar';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/Pages/AboutUs';
import Services from './components/Pages/Services';
import EnergyAuditPage from './components/Pages/Services/EnergyAuditPage';
import LoginSystem from './components/TopNavbar/LoginSystem'; // Import the new LoginSystem component
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div>
          {/* Routes with HomePage component */}
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/courses" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">Courses Content</div>} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/energy-audit" element={<EnergyAuditPage />} />
            {/* Add more routes for other service pages */}
            <Route path="/blogs" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">Blog Content</div>} />
            <Route path="/contact" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">Contact Us Content</div>} />
            <Route path="/login" element={<LoginSystem />} /> {/* Updated to use the LoginSystem component */}
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;