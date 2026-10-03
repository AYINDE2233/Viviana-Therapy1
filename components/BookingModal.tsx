"use client";

import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  "SWEDISH MASSAGE",
  "DEEP TISSUE MASSAGE",
  "HOT STONE MASSAGE",
  "SPORTS MASSAGE",
  "AROMATHERAPY MASSAGE",
  "NURU MASSAGE",
];

const DURATIONS = [
  { label: "1 HOUR", price: "$250.00" },
  { label: "2 HOURS", price: "$450.00" },
  { label: "3 HOURS", price: "$550.00" },
  { label: "4–6 HOURS", price: "$750.00" },
  { label: "10–12 HOURS (OVERNIGHT/DAY)", price: "$1,000.00" },
];

const TIME_SLOTS = [
  "9:00AM",
  "10:00AM",
  "11:00AM",
  "12:00PM",
  "1:00PM",
  "2:00PM",
  "3:00PM",
  "4:00PM",
  "5:00PM",
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  // State for loading, error, and confirmation
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSelectedService("");
    setSelectedDuration("");
    setSelectedDate("");
    setSelectedTime("");
    setPreferredTime("");
    setFormData({ fullName: "", email: "", phone: "", specialRequests: "" });
    setIsConfirmed(false);
    setErrorMsg("");
    setIsSubmitting(false);
    onClose();
  };

  const handleNextStep = async () => {
    setErrorMsg("");

    if (step === 1 && selectedService && selectedDuration) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Validate Step 3 inputs
      if (!formData.fullName || !formData.email) {
        setErrorMsg("Please enter your name and email address.");
        return;
      }

      setIsSubmitting(true);

      try {
        // Send data to backend endpoint
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";
        const response = await fetch(`${API_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject: `New Appointment Booking: ${selectedService}`,
            type: selectedService,
            message: `
--- APPOINTMENT BOOKING DETAILS ---
Service: ${selectedService}
Duration: ${selectedDuration}
Date: ${selectedDate || "Not selected"}
Time Slot: ${selectedTime || "Not selected"}
Preferred Time: ${preferredTime || "Not specified"}
Special Requests: ${formData.specialRequests || "None"}
            `.trim(),
          }),
        });

        const result = await response.json();

        if (response.ok && result.success !== false) {
          setIsConfirmed(true);
        } else {
          setErrorMsg(
            result.error || "Failed to submit booking. Please try again.",
          );
        }
      } catch (err) {
        console.error("Booking error:", err);
        setErrorMsg(
          "Network error. Please ensure the backend server is running.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#f8f6f0] rounded-[2rem] shadow-2xl overflow-hidden my-auto border border-stone-200/50 max-h-[90vh] flex flex-col">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 text-stone-500 hover:text-stone-800 transition p-2 rounded-full hover:bg-stone-200/50 z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8 sm:p-10 overflow-y-auto flex-1">
          {/* HEADER TITLE */}
          <h2 className="text-3xl font-serif text-stone-900 mb-8 font-normal tracking-wide text-left">
            Book Appointment
          </h2>

          {/* STEP INDICATOR */}
          {!isConfirmed && (
            <div className="flex items-center justify-center gap-3 max-w-xs mx-auto mb-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition ${
                  step >= 1
                    ? "bg-orange-500 text-white"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                1
              </div>
              <div
                className={`h-[1px] flex-1 ${step >= 2 ? "bg-orange-500" : "bg-stone-300"}`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition ${
                  step >= 2
                    ? "bg-orange-500 text-white"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                2
              </div>
              <div
                className={`h-[1px] flex-1 ${step >= 3 ? "bg-orange-500" : "bg-stone-300"}`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition ${
                  step >= 3
                    ? "bg-orange-500 text-white"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                3
              </div>
            </div>
          )}

          {/* ERROR ALERT */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200 text-center">
              {errorMsg}
            </div>
          )}

          {/* CONFIRMATION SCREEN */}
          {isConfirmed ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <p className="text-2xl font-serif text-stone-900">
                Booking Confirmed
              </p>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you! Your appointment request has been submitted
                successfully and sent to our email.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: SERVICE & DURATION */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <label className="text-sm font-semibold text-stone-800 block mb-4 tracking-wide">
                      Select Service
                    </label>
                    <div className="space-y-3.5">
                      {SERVICES.map((srv) => {
                        const isSelected = selectedService === srv;
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setSelectedService(srv)}
                            className={`w-full text-left px-6 py-4 rounded-2xl text-xs md:text-sm font-medium tracking-wider uppercase transition border ${
                              isSelected
                                ? "bg-[#efece4] border-stone-400 text-stone-900 ring-2 ring-stone-400/20 shadow-sm"
                                : "bg-[#f2efe9] border-transparent text-stone-700 hover:border-stone-300"
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-stone-800 block mb-4 tracking-wide">
                      Select Duration
                    </label>
                    <div className="space-y-3.5">
                      {DURATIONS.map((dur) => {
                        const isSelected = selectedDuration === dur.label;
                        return (
                          <button
                            key={dur.label}
                            type="button"
                            onClick={() => setSelectedDuration(dur.label)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-xs md:text-sm font-medium tracking-wider uppercase transition border ${
                              isSelected
                                ? "bg-[#efece4] border-stone-400 text-stone-900 ring-2 ring-stone-400/20 shadow-sm"
                                : "bg-[#f2efe9] border-transparent text-stone-700 hover:border-stone-300"
                            }`}
                          >
                            <span>{dur.label}</span>
                            <span className="font-semibold text-stone-900">
                              {dur.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TIME */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-3 tracking-wide">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-transparent bg-[#f2efe9] text-stone-800 focus:outline-none focus:border-stone-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-3 tracking-wide">
                      Pick a Time
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-3.5 rounded-2xl text-xs md:text-sm font-medium transition border ${
                              isSelected
                                ? "bg-[#efece4] border-stone-400 text-stone-900 ring-2 ring-stone-400/20"
                                : "bg-[#f2efe9] border-transparent text-stone-700 hover:border-stone-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-3 tracking-wide">
                      Choose Your Preferred Time
                    </label>
                    <input
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-transparent bg-[#f2efe9] text-stone-800 focus:outline-none focus:border-stone-400 transition"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: YOUR DETAILS */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold text-stone-800 mb-4 tracking-wide">
                    Your Details
                  </h3>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1.5 font-medium">
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-transparent bg-[#f2efe9] text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1.5 font-medium">
                      ✉️ Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-transparent bg-[#f2efe9] text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1.5 font-medium">
                      📞 Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-transparent bg-[#f2efe9] text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1.5 font-medium">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special requests or notes..."
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-transparent bg-[#f2efe9] text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition resize-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        {!isConfirmed && (
          <div className="p-6 sm:px-10 border-t border-stone-200/50 bg-[#f8f6f0] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-200/60 transition disabled:opacity-50"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={
                isSubmitting ||
                (step === 1 && (!selectedService || !selectedDuration))
              }
              className={`px-8 py-3 rounded-xl text-sm font-medium transition shadow-sm ${
                step === 1 && (!selectedService || !selectedDuration)
                  ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              } disabled:opacity-50`}
            >
              {isSubmitting
                ? "Submitting..."
                : step === 3
                  ? "Confirm & Send"
                  : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
