import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Rental from './pages/Rental';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingSuccess from './pages/BookingSuccess';
import WhatsAppButton from './components/WhatsAppButton';
import './i18n';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/package/:id" element={<PackageDetail />} />
                    <Route path="/rental" element={<Rental />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/booking-success" element={<BookingSuccess />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
          
          {/* Floating WhatsApp Button */}
          <WhatsAppButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
