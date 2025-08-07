import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="relative">
        {/* Glowing background ring */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>

        {/* Spinner & text container */}
        <div className="relative flex flex-col items-center gap-4 p-8">
          {/* Spinner */}
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-emerald-400 animate-spin"></div>

          {/* Blurred text glow */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded blur opacity-20"></div>
            <span className="relative text-gray-200 text-sm">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
