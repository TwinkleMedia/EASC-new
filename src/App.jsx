import TopNavbar from './components/TopNavbar/TopNavbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <TopNavbar />
      {/* Main content with padding top to prevent navbar overlap */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center">
            Welcome to Energy Auditors Study Centre
          </h1>
          <p className="mt-2 text-center">
            Your premier destination for energy auditing education and resources
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;