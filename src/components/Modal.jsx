import React, { useState } from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';

const ProjectCardModal = ({ title, description, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Open Modal Button */}
      <button
        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-xl bg-gradient-to-br from-blue-950 via-gray-900 to-emerald-900 p-6 text-white shadow-xl animate-slide-up sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (Top Right) */}
            <button
              className="absolute top-4 right-4 rounded-md p-2 hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Eye className="h-5 w-5 text-white/80" />
            </button>

            {/* Title */}
            <h2 className="mb-4 text-2xl font-bold text-emerald-300">{title}</h2>

            {/* Description */}
            <p className="mb-6 text-gray-300 leading-relaxed">{description}</p>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 font-medium text-white hover:opacity-90 transition-all duration-200"
              >
                Live Demo <ExternalLink className="h-4 w-4" />
              </a>
              <button
                className="rounded-md bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;
