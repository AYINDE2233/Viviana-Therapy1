"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent to my email.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        message:
          "Network error. Please make sure the backend server is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewName("");
    setReviewText("");
    setIsReviewModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4efea] text-stone-800">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#4a3525] text-white py-20 px-6 text-center relative overflow-hidden rounded-b-[40px]">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl tracking-wide">
            Contact Us
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Have questions or ready to book your wellness journey? I am here to
            help you every step of the way.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Visit Us */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#fdf0e6] flex items-center justify-center text-[#ea7a24] mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl mb-2 text-stone-800">Visit Us</h3>
          <p className="text-stone-500 text-sm font-light">
            Available for both Incall & Outcall
          </p>
        </div>

        {/* Call Us */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#fdf0e6] flex items-center justify-center text-[#ea7a24] mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl mb-2 text-stone-800">Call Us</h3>
          <a
            href="tel:+16154579792"
            className="text-stone-600 text-sm font-light hover:underline"
          >
            +1 (504) 342-7251
          </a>
        </div>

        {/* Email Us */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#fdf0e6] flex items-center justify-center text-[#ea7a24] mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl mb-2 text-stone-800">Email Us</h3>
          <a
            href="mailto:sdVivianaspa1005@gmail.com"
            className="text-stone-600 text-sm font-light hover:underline"
          >
            vivianakim622@gmail.com
          </a>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#fdf0e6] flex items-center justify-center text-[#ea7a24] mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl mb-2 text-stone-800">
            Opening Hours
          </h3>
          <p className="text-stone-500 text-sm font-light">
            Flexible Hours – Contact Anytime
          </p>
        </div>
      </section>

      {/* MESSAGE FORM SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-2xl bg-white rounded-3xl p-8 md:p-10 shadow-sm">
          <h2 className="font-serif text-3xl text-stone-800 mb-2">
            Send Us a Message
          </h2>
          <p className="text-stone-500 text-sm font-light mb-8">
            Fill out the form below and I will get back to you within 24 hours.
          </p>

          {/* SUCCESS / ERROR ALERTS */}
          {status.message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium mb-6 ${
                status.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm placeholder-stone-400"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm placeholder-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm placeholder-stone-400"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Booking Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm placeholder-stone-400"
                />
              </div>
            </div>

            {/* Your Message */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-2">
                Your Message *
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm placeholder-stone-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ea7a24] hover:bg-[#d66a1a] disabled:bg-stone-300 text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* WRITE A REVIEW TRIGGER SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm text-center space-y-4">
          <h3 className="font-serif text-2xl text-stone-800">
            Have you enjoyed our services?
          </h3>
          <p className="text-stone-500 text-sm font-light">
            We value your feedback. Leave a review to let us know about your
            experience!
          </p>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="w-full bg-[#ea7a24] hover:bg-[#d66a1a] text-white py-4 rounded-xl font-semibold transition shadow-sm cursor-pointer"
          >
            Write a review
          </button>
        </div>
      </section>

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-5 shadow-xl relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-stone-900">Leave a Review</h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm"
                />
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-5 py-2.5 border border-stone-300 hover:bg-stone-50 rounded-xl text-stone-700 font-medium text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#ea7a24] hover:bg-[#d66a1a] text-white font-medium text-sm rounded-xl transition shadow-sm cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <span className="text-[#ea7a24] text-xs font-bold uppercase tracking-wider block mb-2">
          FAQ
        </span>
        <h2 className="font-serif text-4xl text-stone-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 text-left shadow-sm">
          <h3 className="font-serif text-lg text-stone-800 mb-2">
            How far in advance should I book my appointment?
          </h3>
          <p className="text-stone-500 text-sm font-light leading-relaxed">
            I recommend booking at least 1hr hour in advance, especially for
            weekends.
          </p>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#527d58] text-stone-100 py-16 px-6 md:px-12 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/20 pb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ea7a24] flex items-center justify-center text-white font-serif font-bold italic text-sm">
                🍃
              </div>
              <span className="font-serif text-2xl tracking-wide text-white">
                Massage Therapy by Vivianaspa
              </span>
            </Link>
            <p className="text-sm text-stone-200 leading-relaxed font-light">
              Your sanctuary of wellness, peace, and harmony. Experience the art
              of relaxation with Vivianaspa, your expert massage therapist.
            </p>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-stone-200 font-light">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-stone-200 font-light">
              <li>Swedish Massage</li>
              <li>Deep Tissue Massage</li>
              <li>Hot Stone Massage</li>
              <li>Sports Massage</li>
              <li>Aromatherapy Massage</li>
              <li>Nuru Massage</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm text-stone-200 font-light">
              <li>Available for both Incall & Outcall</li>
              <li>+1 (615) 457-9792</li>
              <li>
                <a
                  href="mailto:sdVivianaspa1005@gmail.com"
                  className="hover:underline"
                >
                  sdVivianaspa1005@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-stone-200 font-light">
          <p>© 2026 Massage Therapy by Vivianaspa. All rights reserved.</p>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="mr-2 text-white">We Accept:</span>

            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10 min-w-[50px]">
              <span className="text-[#00d68f] font-black tracking-tight text-xl">
                C
              </span>
            </div>

            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10 min-w-[50px]">
              <span className="text-[#f7931a] font-bold text-xl">₿</span>
            </div>

            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10">
              <div className="bg-stone-900 text-white rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Gift Card
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10">
              <span className="text-[#7414ca] font-extrabold text-lg tracking-tighter">
                zelle
              </span>
            </div>

            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10 min-w-[50px]">
              <span className="text-[#00d632] font-bold text-xl">$</span>
            </div>

            <div className="bg-black text-white rounded-xl px-4 py-1.5 flex flex-col items-center justify-center h-10 text-center leading-tight">
              <span className="text-xs font-semibold">Cash</span>
              <span className="text-[9px] text-stone-300">
                Regular Clients Only
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}