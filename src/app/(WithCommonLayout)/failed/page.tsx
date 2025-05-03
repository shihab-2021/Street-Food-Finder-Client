export default function PaymentFail() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#232536] text-white p-6">
        <div className="text-6xl mb-4 text-red-500">❌</div>
        <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-300 mb-6">Something went wrong. Please try again later or contact support.</p>
        <a
          href="/pricing"
          className="px-6 py-2 bg-[#FFB900] text-[#232536] rounded-md font-semibold hover:bg-yellow-400 transition"
        >
          Try Again
        </a>
      </div>
    );
  }
  