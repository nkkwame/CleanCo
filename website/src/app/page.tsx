"use client";

import React, { useState, useEffect } from "react";

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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-50 rounded-lg shadow p-6 cursor-pointer" onClick={() => setOpen(!open)}>
      <h3 className="font-bold text-lg mb-2 flex justify-between items-center">
        {question}
        <span className="ml-2">{open ? "▲" : "▼"}</span>
      </h3>
      {open && <p>{answer}</p>}
    </div>
  );
}

function MultiCarousel({ items, renderItem, interval = 3000, visible = 3 }: { items: any[]; renderItem: (item: any) => React.ReactNode; interval?: number; visible?: number }) {
  const [start, setStart] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setStart(i => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);
  // Get visible items in a loop
  const visibleItems = Array.from({ length: visible }, (_, idx) => items[(start + idx) % items.length]);
  return (
    <div className="relative w-full flex justify-center items-center gap-8 overflow-hidden">
      {visibleItems.map((item, idx) => (
        <div key={idx} className="transition-transform duration-500">
          {renderItem(item)}
        </div>
      ))}
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

      {/* Trusted Companies Section (MultiCarousel) */}
      <section id="trusted" className="w-full py-20 px-4 bg-white text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 animate-fade-in">Trusted By</h2>
        <MultiCarousel
          items={[{src: "/next.svg", name: "Next.js"}, {src: "/vercel.svg", name: "Vercel"}, {src: "/globe.svg", name: "Globe Inc."}, {src: "/file.svg", name: "FileCo"}, {src: "/window.svg", name: "WindowWorks"}]}
          renderItem={item => (
            <div className="flex flex-col items-center grayscale hover:grayscale-0 transition-all duration-200">
              <img src={item.src} alt={item.name} className="h-14 mb-2" />
              <span className="text-gray-700 text-lg font-bold">{item.name}</span>
            </div>
          )}
          interval={2500}
          visible={3}
        />
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

      {/* Call-to-Action Section (MultiCarousel) */}
      <section id="cta" className="w-full py-16 px-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6">What Our Clients Say</h2>
        <MultiCarousel
          items={[
            {msg: "CleanCo transformed our workspace. Their team is professional and thorough!", author: "Acme Corp"},
            {msg: "Reliable, friendly, and always on time. Highly recommended.", author: "Globex Inc."},
            {msg: "The best cleaning service we've ever used!", author: "FileCo"},
            {msg: "Our offices have never looked better.", author: "WindowWorks"}
          ]}
          renderItem={item => (
            <div className="bg-white text-blue-900 rounded-xl shadow-lg p-6 w-80 mx-auto flex flex-col items-center">
              <p className="italic mb-2">“{item.msg}”</p>
              <span className="font-bold">- {item.author}</span>
            </div>
          )}
          interval={3500}
          visible={3}
        />
        <h3 className="text-2xl font-bold mb-4 mt-8">Ready for a spotless office?</h3>
        <a href="#contact" className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-gray-100 transition">Get Started with CleanCo</a>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 px-4 bg-white text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-900">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto text-left space-y-6">
          <FAQItem question="What types of cleaning services do you offer?" answer="We provide office cleaning, industrial cleaning, and sanitization services tailored to your company’s needs." />
          <FAQItem question="How do I request a quote?" answer="Simply fill out the contact form on our website, and our team will get back to you promptly." />
          <FAQItem question="Are your cleaners vetted and trained?" answer="Yes, all CleanCo staff are thoroughly vetted and professionally trained to ensure the highest standards." />
          <FAQItem question="Can I make a complaint or request a specific cleaner?" answer="Yes, you can make complaints or requests directly from your dashboard after logging in." />
        </div>
      </section>
    </div>
  );
}
