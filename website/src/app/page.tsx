
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6 text-center">Welcome to CleanCo</h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center max-w-2xl">
        Your trusted partner for professional cleaning services for companies. We deliver spotless results for offices, industrial sites, and more.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 w-64">
          <h2 className="text-xl font-semibold mb-2">Office Cleaning</h2>
          <p>Daily, weekly, or monthly cleaning for your office spaces.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-64">
          <h2 className="text-xl font-semibold mb-2">Industrial Cleaning</h2>
          <p>Specialized cleaning for factories, warehouses, and industrial sites.</p>
        </div>
        {/* Room for more services */}
      </div>
      <a href="/contact" className="bg-blue-900 text-white px-6 py-3 rounded font-bold text-lg hover:bg-blue-800 transition">Request a Quote</a>
    </section>
  );
}
