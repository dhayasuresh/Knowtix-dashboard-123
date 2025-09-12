import React from 'react';

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">Tailwind CSS Test</h1>
        <p className="text-gray-600 text-center">If you see this with proper styling, Tailwind is working!</p>
        <div className="flex flex-col space-y-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Secondary Button
          </button>
        </div>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Testing Utility Classes</h2>
          <div className="space-y-2">
            <p className="text-red-500 font-medium">Red text</p>
            <p className="text-blue-500 font-medium">Blue text</p>
            <p className="text-green-500 font-medium">Green text</p>
          </div>
        </div>
      </div>
    </div>
  );
}