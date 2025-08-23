"use client";

function ServiceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 w-80 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl animate-fade-in">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-2xl font-bold mb-2 text-blue-900">{title}</h3>
      <p className="text-gray-700 text-lg">{desc}</p>
    </div>
  );
}

function CompanyLogo({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex flex-col items-center grayscale hover:grayscale-0 transition-all duration-200">
      <img src={src} alt={name} className="h-14 mb-2" />
      <span className="text-gray-700 text-sm">{name}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section
        id="hero"
        className="w-full min-h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"
      >
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg animate-fade-in">CleanCo</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto text-white/90 animate-fade-in delay-100">Professional cleaning services for companies. Spotless results, trusted by industry leaders.</p>
          <a href="#contact" className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-gray-100 transition-all duration-200 animate-fade-in delay-200">Request a Quote</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 animate-fade-in">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <ServiceCard icon="🧹" title="Office Cleaning" desc="Daily, weekly, or monthly cleaning for your office spaces." />
          <ServiceCard icon="🏭" title="Industrial Cleaning" desc="Specialized cleaning for factories, warehouses, and industrial sites." />
          <ServiceCard icon="🧴" title="Sanitization" desc="Deep cleaning and sanitization for health and safety compliance." />
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section id="trusted" className="w-full py-20 px-4 bg-white text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 animate-fade-in">Trusted By</h2>
        <div className="flex flex-wrap justify-center gap-12 items-center">
          <CompanyLogo src="/next.svg" name="Next.js" />
          <CompanyLogo src="/vercel.svg" name="Vercel" />
          <CompanyLogo src="/globe.svg" name="Globe Inc." />
          {/* Add more company logos here */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 animate-fade-in">Contact Us</h2>
        <form className="max-w-lg mx-auto flex flex-col gap-6 items-center bg-white rounded-xl shadow-lg p-8 animate-fade-in">
          <input type="text" name="company" placeholder="Company Name" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
          <input type="email" name="email" placeholder="Email" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
          <textarea name="message" placeholder="Message" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
          <button type="submit" className="bg-blue-900 text-white py-3 px-8 rounded-full font-bold text-lg shadow hover:bg-blue-800 transition-all duration-200">Request a Quote</button>
        </form>
      </section>
    </div>
  );
}
