import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";

// Pages & Components
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import NotFoundPage from "./Pages/404";

import { AnimatePresence } from 'framer-motion';

// Main Landing Page Layout
const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />

          {/* Footer */}
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a
                  href="https://www.linkedin.com/in/abdul-rehman-50a117342/"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abdul Rehman™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

// Project Details Page Layout
const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a
            href="https://www.linkedin.com/in/abdul-rehman-50a117342/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abdul Rehman™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

// Main App Component
function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />}
        />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
