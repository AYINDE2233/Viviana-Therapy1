"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
interface Review {
  id: number;
  name: string;
  avatar: string;
  avatarBg?: string;
  date: string;
  verified?: boolean;
  rating: number;
  text: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Emily H",
    avatar: "EH",
    avatarBg: "bg-teal-700",
    date: "Apr 9, 2025",
    rating: 5,
    text: "A very calming experience from beginning to end. Vivianaspa listened to the areas where I had tension and adjusted the session perfectly. I felt so much better afterward and will definitely return.",
  },
  {
    id: 2,
    name: "Michael R",
    avatar: "MR",
    avatarBg: "bg-teal-700",
    date: "Mar 7, 2026",
    verified: true,
    rating: 4,
    text: "Very good at what she does, but not always available.",
  },
  {
    id: 3,
    name: "Mark & Jennifer S",
    avatar: "/Vivianaspa-about.jpg",
    date: "May 8, 2026",
    verified: true,
    rating: 5,
    text: "We had a wonderful couples massage experience. Vivianaspa was warm, professional, and made us both feel comfortable from the moment we arrived.",
  },
];

const MORE_REVIEWS: Review[] = [
  {
    id: 4,
    name: "Bryan S",
    avatar: "",
    date: "May 28, 2026",
    verified: true,
    rating: 5,
    text: "Professional, caring and highly recommended.",
  },
  {
    id: 5,
    name: "Chris M",
    avatar: "CM",
    avatarBg: "bg-teal-700",
    date: "Jun 2, 2026",
    verified: true,
    rating: 5,
    text: "Very pleasant experience. Vivianaspa has a calming personality and great technique. Left feeling refreshed and much less stressed.",
  },
  {
    id: 6,
    name: "David K",
    avatar: "D",
    avatarBg: "bg-teal-700",
    date: "Jun 17, 2026",
    verified: true,
    rating: 5,
    text: "Friendly and outstanding service. Will definitely return.",
  },
  {
    id: 7,
    name: "Kevin L",
    avatar: "",
    date: "Jul 4, 2026",
    rating: 5,
    text: "I felt relaxed.",
  },
];

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [hasLoadedMore, setHasLoadedMore] = useState<boolean>(false);
  // const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  const handleLoadMore = () => {
    setReviews((prev) => [...prev, ...MORE_REVIEWS]);
    setHasLoadedMore(true);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-end pb-12 md:pb-20 text-center px-4 overflow-hidden">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-top md:bg-[center_top_10%] transition-all duration-700"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          {/* Gentle gradient to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
        </div>

        {/* HERO CONTENT OVERLAY */}
        <div className="relative z-10 max-w-5xl w-full px-2">
          {/* Vivianaspa'S STUDIO - STRICTLY ON A SINGLE STRAIGHT LINE */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-3 tracking-[0.1em] uppercase drop-shadow-md font-normal whitespace-nowrap">
            Vivianaspa's Studio
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-stone-200 mb-8 font-light italic tracking-wide drop-shadow-sm max-w-2xl mx-auto">
            "Expert therapeutic massage to restore your mind, body, and
            wellness."
          </p>

          {/* ACTION BUTTONS WITH HOVER-TO-WHITE STYLING */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            {/* Customer Reviews Button */}
            <Link
              href="#reviews"
              className="w-full sm:w-auto min-w-[200px] bg-[#ea7a24] border-2 border-[#ea7a24] text-white hover:bg-white hover:text-stone-900 hover:border-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md text-center"
            >
              Customer Reviews
            </Link>

            {/* Payment Methods Button (NOW ORANGE DEFAULT, TURNS WHITE ON HOVER) */}
            <Link
              href="#payments"
              className="w-full sm:w-auto min-w-[200px] bg-[#ea7a24] border-2 border-[#ea7a24] text-white hover:bg-white hover:text-stone-900 hover:border-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md text-center"
            >
              Payment Methods
            </Link>

            {/* Check Gift Card Balance Button */}
            <Link
              href="/gift-card-balance"
              className="w-full sm:w-auto min-w-[200px] bg-[#ea7a24] border-2 border-[#ea7a24] text-white hover:bg-white hover:text-stone-900 hover:border-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md text-center"
            >
              Check Gift Card Balance
            </Link>
          </div>
        </div>
      </section>

      {/* MEET Vivianaspa (ABOUT) SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl bg-stone-200">
          <img
            src="/brooke-about.jpg"
            alt="Vivianaspa - Massage Therapist"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-6 text-stone-700">
          <span className="text-[#ea7a24] font-semibold uppercase tracking-widest text-sm">
            Meet Vivianaspa
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 pb-2">
            Your Expert Massage Therapist
          </h2>

          <div className="space-y-5 leading-relaxed font-light text-lg">
            <p>
              Hello gentlemen, I'm Vivianaspa. I'm 28 years old, single, and
              independent.
            </p>
            <p>
              With over years of experience in therapeutic massage and holistic
              wellness, I've dedicated my career to mastering both traditional
              healing techniques and contemporary spa innovations. My journey
              began with a passion for helping others find relief from pain and
              stress.
            </p>
            <p>
              I'm fun, sweet, sensual, and easygoing, with a great sense of
              humor. I enjoy good conversation, great company, and always treat
              others with respect.
            </p>
            <p>
              I'm available for both incall and outcall, and I offer a
              full-service experience for generous, respectful gentlemen. No
              games, please—I'm here for genuine, respectful arrangements only.
            </p>
            <p>
              My mission is to provide you with an exceptional wellness
              experience in a warm, Let me give you an unforgettable experience
              you'll want to come back to.
            </p>
          </div>
        </div>
      </section>

      {/* MOMENTS (GALLERY) SECTION */}
      <section className="bg-[#f0f1ea] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#ea7a24] font-semibold uppercase tracking-widest text-sm">
              Moments
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">
              Behind The Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-md bg-stone-200"
              >
                <img
                  src={`/gallery-${item}.jpg`}
                  alt={`Gallery ${item}`}
                  className="object-cover w-full h-full transition hover:scale-105 duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-[#e4ecce] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-orange-600 font-semibold uppercase tracking-widest text-sm">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">
              Massage Treatments
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Choose from our premium massage treatments. Select your preferred
              duration and pricing during booking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div className="w-12 h-12 border border-orange-200 rounded-lg flex items-center justify-center text-orange-500 mb-6 transition-colors duration-300 group-hover:bg-orange-50">
                ✨
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-orange-500 transition-colors">
                SPECIAL SERVICE (NURU + GFE + FS)
              </h3>
              <p className="text-stone-500 mb-8 flex-grow">
                Full service with no restrictions.
              </p>

              <div className="space-y-4 mb-8">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Pricing
                </span>
                <div className="flex justify-between items-center text-sm border-t border-stone-100 pt-4">
                  <span className="text-stone-500">60 Minutes</span>
                  <span className="text-[#ea7a24] font-semibold">$350</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-stone-100 pt-4">
                  <span className="flex items-center gap-2 text-stone-500">
                    90 Minutes
                    <span className="bg-[#ea7a24] text-white text-[10px] px-2 py-0.5 rounded-full uppercase">
                      Recommended
                    </span>
                  </span>
                  <span className="text-[#ea7a24] font-semibold">$400</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-stone-100 pt-4">
                  <span className="text-stone-500">120 Minutes</span>
                  <span className="text-[#ea7a24] font-semibold">$500</span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full border border-stone-200 group-hover:border-[#ea7a24] group-hover:bg-[#ea7a24] group-hover:text-white text-stone-600 py-3 rounded-lg transition-all duration-300 mt-auto font-medium"
              >
                BOOK NOW
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div className="w-12 h-12 border border-orange-200 rounded-lg flex items-center justify-center text-orange-500 mb-6 transition-colors duration-300 group-hover:bg-orange-50">
                🤍
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-orange-500 transition-colors">
                SWEDISH MASSAGE
              </h3>
              <p className="text-stone-500 mb-8 flex-grow">
                Gentle massage that relieves stress, improves circulation, and
                promotes deep relaxation.
              </p>

              <div className="mb-8 border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Starting From
                </span>
                <div className="text-[#ea7a24] font-bold text-3xl">
                  $250{" "}
                  <span className="text-sm font-normal text-stone-400 group-hover:text-stone-500">
                    / hour
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full border border-stone-200 group-hover:border-[#ea7a24] group-hover:bg-[#ea7a24] group-hover:text-white text-stone-600 py-3 rounded-lg transition-all duration-300 mt-auto font-medium"
              >
                BOOK NOW
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div className="w-12 h-12 bg-[#ea7a24] rounded-lg flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110">
                🖐️
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-orange-500 transition-colors">
                DEEP TISSUE MASSAGE
              </h3>
              <p className="text-stone-500 mb-8 flex-grow">
                Firm pressure designed to release chronic muscle tension and
                stiffness.
              </p>

              <div className="mb-8 border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Starting From
                </span>
                <div className="text-[#ea7a24] font-bold text-3xl">
                  $250{" "}
                  <span className="text-sm font-normal text-stone-400 group-hover:text-stone-500">
                    / hour
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full border border-stone-200 group-hover:border-[#ea7a24] group-hover:bg-[#ea7a24] group-hover:text-white text-stone-600 py-3 rounded-lg transition-all duration-300 mt-auto font-medium"
              >
                BOOK NOW
              </button>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div className="w-12 h-12 border border-orange-200 rounded-lg flex items-center justify-center text-orange-500 mb-6 transition-colors duration-300 group-hover:bg-orange-50">
                🔥
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-orange-500 transition-colors">
                HOT STONE MASSAGE
              </h3>
              <p className="text-stone-500 mb-8 flex-grow">
                Heated stones melt away stress while soothing tight muscles and
                improving circulation.
              </p>

              <div className="mb-8 border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Starting From
                </span>
                <div className="text-[#ea7a24] font-bold text-3xl">
                  $250{" "}
                  <span className="text-sm font-normal text-stone-400 group-hover:text-stone-500">
                    / hour
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full border border-stone-200 group-hover:border-[#ea7a24] group-hover:bg-[#ea7a24] group-hover:text-white text-stone-600 py-3 rounded-lg transition-all duration-300 mt-auto font-medium"
              >
                BOOK NOW
              </button>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div className="w-12 h-12 border border-orange-200 rounded-lg flex items-center justify-center text-orange-500 mb-6 transition-colors duration-300 group-hover:bg-orange-50">
                🏃
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-orange-500 transition-colors">
                SPORTS MASSAGE
              </h3>
              <p className="text-stone-500 mb-8 flex-grow">
                Perfect for athletes to improve recovery, flexibility, and
                performance.
              </p>

              <div className="mb-8 border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Starting From
                </span>
                <div className="text-[#ea7a24] font-bold text-3xl">
                  $250{" "}
                  <span className="text-sm font-normal text-stone-400 group-hover:text-stone-500">
                    / hour
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full border border-stone-200 group-hover:border-[#ea7a24] group-hover:bg-[#ea7a24] group-hover:text-white text-stone-600 py-3 rounded-lg transition-all duration-300 mt-auto font-medium"
              >
                BOOK NOW
              </button>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div className="w-12 h-12 border border-orange-200 rounded-lg flex items-center justify-center text-orange-500 mb-6 transition-colors duration-300 group-hover:bg-orange-50">
                🌸
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-orange-500 transition-colors">
                AROMATHERAPY MASSAGE
              </h3>
              <p className="text-stone-500 mb-8 flex-grow">
                Relaxing massage enhanced with essential oils for complete mind
                and body wellness.
              </p>

              <div className="mb-8 border-t border-stone-100 pt-4">
                <span className="text-xs text-stone-400 uppercase tracking-wider block mb-1">
                  Starting From
                </span>
                <div className="text-[#ea7a24] font-bold text-3xl">
                  $250{" "}
                  <span className="text-sm font-normal text-stone-400 group-hover:text-stone-500">
                    / hour
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full border border-stone-200 group-hover:border-[#ea7a24] group-hover:bg-[#ea7a24] group-hover:text-white text-stone-600 py-3 rounded-lg transition-all duration-300 mt-auto font-medium"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 px-6 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900">
            Reviews
          </h2>

          {/* WRITE A REVIEW BUTTON */}
          <button className="w-full bg-[#ea7a24] hover:bg-[#d66b1a] text-white py-4 rounded-xl text-lg font-medium transition shadow-sm">
            Write a review
          </button>

          {/* FILTERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <select className="w-full bg-white border border-stone-200 rounded-xl px-5 py-3.5 text-stone-700 appearance-none focus:outline-none focus:border-orange-500 shadow-sm cursor-pointer">
                <option value="4star">4 Stars</option>
                <option value="5star">5 Stars</option>
                <option value="all">All Stars</option>
              </select>
            </div>
            <div className="relative">
              <select className="w-full bg-white border border-stone-200 rounded-xl px-5 py-3.5 text-stone-700 appearance-none focus:outline-none focus:border-orange-500 shadow-sm cursor-pointer">
                <option value="oldest">Oldest</option>
                <option value="newest">Newest</option>
                <option value="highest">Highest Rating</option>
              </select>
            </div>
          </div>

          {/* REVIEWS GRID */}
          <div className="grid md:grid-cols-3 gap-6 pt-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {rev.avatar ? (
                      rev.avatar.startsWith("/") ? (
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 ${
                            rev.avatarBg || "bg-stone-800"
                          } text-white flex items-center justify-center rounded-full font-serif font-medium text-base`}
                        >
                          {rev.avatar}
                        </div>
                      )
                    ) : (
                      <div className="w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center text-stone-500">
                        👤
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-stone-900">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {rev.date}
                        {rev.verified && (
                          <span className="text-emerald-600 font-medium ml-2 inline-flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                            Verified
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="text-amber-400 mb-4 text-sm tracking-wider">
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {rev.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE REVIEWS BUTTON */}
          {!hasLoadedMore && (
            <div className="flex justify-center pt-6">
              <button
                onClick={handleLoadMore}
                className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 px-8 py-3.5 rounded-xl text-sm font-medium transition shadow-sm"
              >
                Load more reviews
              </button>
            </div>
          )}

          {/* BOOK NOW BANNER BELOW REVIEWS */}
          <div className="pt-8" id="payments">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full bg-[#ea7a24] hover:bg-[#d66b1a] text-white text-center py-4 rounded-xl text-lg font-medium transition shadow-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#527d58] text-stone-100 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/20 pb-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ea7a24] flex items-center justify-center text-white text-sm">
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

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-stone-200 font-light">
              <li>
                <Link href="/" className="hover:underline transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-stone-200 font-light">
              <li>
                <Link href="#services" className="hover:underline transition">
                  Swedish Massage
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline transition">
                  Deep Tissue Massage
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline transition">
                  Hot Stone Massage
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline transition">
                  Sports Massage
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline transition">
                  Aromatherapy Massage
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline transition">
                  Nuru Massage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm text-stone-200 font-light">
              <li>Available for both Incall & Outcall</li>
              <li>+1 (504) 342-7251</li>
              <li>
                <a
                  href="mailto:sdVivianaspa1005@gmail.com"
                  className="hover:underline"
                >
                  vivianakim622@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-stone-200 font-light">
          <p>© 2026 Massage Therapy by Vivianaspa. All rights reserved.</p>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="mr-2 text-white">We Accept:</span>

            {/* Chime Badge */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10 min-w-[50px]">
              <span className="text-[#00d68f] font-black tracking-tight text-xl">
                C
              </span>
            </div>

            {/* Bitcoin Badge */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10 min-w-[50px]">
              <span className="text-[#f7931a] font-bold text-xl">₿</span>
            </div>

            {/* Gift Card Badge */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10">
              <div className="bg-stone-900 text-white rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Gift Card
              </div>
            </div>

            {/* Zelle Badge */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10">
              <span className="text-[#7414ca] font-extrabold text-lg tracking-tighter">
                zelle
              </span>
            </div>

            {/* Cash App Badge */}
            <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center shadow-sm h-10 min-w-[50px]">
              <span className="text-[#00d632] font-bold text-xl">$</span>
            </div>

            {/* Cash / Regular Clients Only Badge */}
            <div className="bg-black text-white rounded-xl px-4 py-1.5 flex flex-col items-center justify-center h-10 text-center leading-tight">
              <span className="text-xs font-semibold">Cash</span>
              <span className="text-[9px] text-stone-300">
                Regular Clients Only
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
    </main>
  );
}
