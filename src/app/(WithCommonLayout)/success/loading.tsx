import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
        <p className="text-green-700 text-lg font-medium tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
