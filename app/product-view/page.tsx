"use client"

// Product view page - Products have been removed
export default function ProductView() {
  const handleClose = () => {
    window.close()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Available</h1>
        <p className="text-gray-600">All products have been removed from the website.</p>
        <button 
          onClick={handleClose}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}
