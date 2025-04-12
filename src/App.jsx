import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar/TopNavbar';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div>
          {/* Routes with HomePage component */}
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">About Us Content</div>} />
            <Route path="/courses" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">Courses Content</div>} />
            <Route path="/contact" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">Contact Us Content</div>} />
            <Route path="/login" element={<div className="pt-20 max-w-7xl mx-auto py-12 px-4">Login Content</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;