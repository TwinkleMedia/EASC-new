import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar/TopNavbar';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/Pages/AboutUs';
import Services from './components/Pages/Services';
import CEMExamsPage from './components/Pages/Courses/CEMExamsPage';
import CEAExamsPage from './components/Pages/Courses/CEAExamsPage';
import EnergyAuditPage from './components/Pages/Services/EnergyAuditPage';
import ContactUs from './components/Pages/ContactUs';
import LoginSystem from './components/TopNavbar/LoginSystem'; // Import the new LoginSystem component
import ResetPassword from './components/TopNavbar/ResetPassword';
import MyCartPage from './components/Pages/MyCartPage';
import BlogPage from './components/Pages/BlogPage';
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
            <Route path="/courses/cem/:id" element={<CEMExamsPage />} />
            <Route path="/courses/cem-exams" element={<CEMExamsPage />} />
            <Route path="/courses/cea/:id" element={<CEAExamsPage />} />
            <Route path="/courses/cea-exams" element={<CEAExamsPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/energy-audit" element={<EnergyAuditPage />} />
            {/* Add more routes for other service pages */}
            <Route path="/blogs" element={<BlogPage />} />
            
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<LoginSystem />} /> {/* Updated to use the LoginSystem component */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/my-cart" element={<MyCartPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;