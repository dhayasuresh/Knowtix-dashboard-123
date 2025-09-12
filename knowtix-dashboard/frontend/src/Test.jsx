// src/Test.jsx
export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">Tailwind CSS Test</h1>
        <p className="text-gray-600 text-center">If you see this with proper styling, Tailwind is working!</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Primary Button
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  )
}