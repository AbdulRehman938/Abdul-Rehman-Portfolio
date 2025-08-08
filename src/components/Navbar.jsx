import React, { useState, useEffect } from "react";
import { Menu, X, Download, Eye, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker - Multiple fallbacks
if (typeof window !== 'undefined') {
  // Try different worker sources
  pdfjs.GlobalWorkerOptions.workerSrc = 
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [showResume, setShowResume] = useState(false);
  
  // PDF viewer states
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#Contact", label: "Contact" },
    { href: "#Resume", label: "Resume" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems
        .map((item) => {
          if (item.label === "Resume") return null;
          const section = document.querySelector(item.href);
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 550,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen || showResume ? "hidden" : "unset";
  }, [isOpen, showResume]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 100;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/AbdulRehman-SoftwareEngineer.pdf";
    link.download = "AbdulRehman-SoftwareEngineer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF viewer functions
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF Error Details:', {
      error: error,
      message: error?.message,
      name: error?.name,
      stack: error?.stack
    });
    setError(`PDF Load Error: ${error?.message || 'Check console for details'}`);
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setScale(1.0);
    setRotation(0);
    setPageNumber(1);
  };

  const handleResumeOpen = () => {
    setShowResume(true);
    setLoading(true);
    setError(null);
    setPageNumber(1);
    setScale(1.0);
    setRotation(0);
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${isOpen
            ? "bg-[#0a0f1a]"
            : scrolled
              ? "bg-[#0a0f1a]/50 backdrop-blur-xl"
              : "bg-transparent"
          }`}
      >
        <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a
                href="#Home"
                onClick={(e) => scrollToSection(e, "#Home")}
                className="text-xl font-bold bg-gradient-to-r from-[#41ECFF] to-[#1BA5B0] bg-clip-text text-transparent"
              >
                Abdul Rehman
              </a>
            </div>

            <div className="hidden md:block">
              <div className="ml-8 flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.label === "Resume") {
                        e.preventDefault();
                        handleResumeOpen();
                        setIsOpen(false);
                      } else {
                        scrollToSection(e, item.href);
                      }
                    }}
                    className="group relative px-1 py-2 text-sm font-medium"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${activeSection === item.href.substring(1)
                          ? "bg-gradient-to-r from-[#41ECFF] to-[#1BA5B0] bg-clip-text text-transparent font-semibold"
                          : "text-[#e0f7ff] group-hover:text-white"
                        }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#41ECFF] to-[#1BA5B0] transform origin-left transition-transform duration-300 ${activeSection === item.href.substring(1)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 text-[#e0f7ff] hover:text-white transition-transform duration-300 ease-in-out transform ${isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                  }`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.label === "Resume") {
                    e.preventDefault();
                    handleResumeOpen();
                    setIsOpen(false);
                  } else {
                    scrollToSection(e, item.href);
                  }
                }}
                className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${activeSection === item.href.substring(1)
                    ? "bg-gradient-to-r from-[#41ECFF] to-[#1BA5B0] bg-clip-text text-transparent font-semibold"
                    : "text-[#e0f7ff] hover:text-white"
                  }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isOpen ? "translateX(0)" : "translateX(50px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {showResume && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col">
            {/* Header with controls */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              {/* PDF Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Page Navigation */}
                <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-medium min-w-[60px] text-center">
                    {numPages ? `${pageNumber} / ${numPages}` : '--'}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                  <button
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-sm font-medium min-w-[50px] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    disabled={scale >= 3.0}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>

                {/* Rotation */}
                <button
                  onClick={rotate}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  <RotateCw size={16} />
                </button>

                {/* Reset View */}
                <button
                  onClick={resetView}
                  className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gradient-to-r from-[#41ECFF] to-[#1BA5B0] text-white rounded shadow hover:opacity-90 flex items-center transition-opacity"
                >
                  <Download className="mr-2" size={16} /> Download
                </button>
                <button
                  onClick={() => setShowResume(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-500 flex items-center transition-colors"
                >
                  <X className="mr-2" size={16} /> Close
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto rounded border bg-gray-50 flex items-center justify-center">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#41ECFF]"></div>
                  <span className="ml-2 text-gray-600">Loading PDF...</span>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full text-red-600">
                  <p className="text-lg font-medium mb-2">Error Loading PDF</p>
                  <p className="text-sm mb-4 text-center max-w-md">{error}</p>
                  <div className="text-xs text-gray-500 mb-4 max-w-md text-center">
                    <p>Debug info:</p>
                    <p>PDF.js version: {pdfjs.version}</p>
                    <p>File path: /AbdulRehman-SoftwareEngineer.pdf</p>
                    <p>Check browser console for detailed errors</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setError(null);
                        setLoading(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Retry
                    </button>
                    <button
                      onClick={() => {
                        window.open('/AbdulRehman-SoftwareEngineer.pdf', '_blank');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Open PDF Directly
                    </button>
                  </div>
                </div>
              )}

              {!loading && !error && (
                <div className="p-4">
                  <Document
                    file={{
                      url: "/AbdulRehman-SoftwareEngineer.pdf",
                      httpHeaders: {
                        'Cache-Control': 'no-cache'
                      }
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    options={{
                      cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
                      cMapPacked: true,
                      standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
                      verbosity: 1
                    }}
                    loading={
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#41ECFF]"></div>
                        <span className="ml-2 text-gray-600">Loading PDF...</span>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      rotate={rotation}
                      loading={
                        <div className="flex items-center justify-center h-96">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#41ECFF]"></div>
                        </div>
                      }
                      className="shadow-lg"
                    />
                  </Document>
                </div>
              )}
            </div>

            {/* Footer with page info */}
            {numPages && (
              <div className="mt-2 text-center text-sm text-gray-600">
                Page {pageNumber} of {numPages} • Scale: {Math.round(scale * 100)}% • Rotation: {rotation}°
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;