export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Our Services</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Office Cleaning</h2>
          <p>Daily, weekly, or monthly cleaning for your office spaces.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Industrial Cleaning</h2>
          <p>Specialized cleaning for factories, warehouses, and industrial sites.</p>
        </div>
        {/* Room for more services */}
      </div>
    </section>
  );
}
