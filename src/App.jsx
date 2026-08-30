import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Topbar from './components/layout/Topbar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import LeadPopupModal from './components/common/LeadPopupModal';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';

export default function App() {
  const [contactPopupOpen, setContactPopupOpen] = useState(false);

  const handleOpenPopup = () => setContactPopupOpen(true);
  const handleClosePopup = () => setContactPopupOpen(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between selection:bg-red-500 selection:text-white">
        <div>
          {/* Top Contact Bar */}
          <Topbar />

          {/* Sticky Navbar */}
          <Navbar onOpenContactPopup={handleOpenPopup} />

          {/* Main Application Routes wrapped in ErrorBoundary */}
          <main>
            <ErrorBoundary>
              <AppRoutes onOpenContactPopup={handleOpenPopup} />
            </ErrorBoundary>
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action Buttons */}
        <FloatingActions />

        {/* Lead Capture Popup Modal */}
        <LeadPopupModal isOpen={contactPopupOpen} onClose={handleClosePopup} />
      </div>
    </BrowserRouter>
  );
}
