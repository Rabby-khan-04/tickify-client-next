"use client";

import { useState } from "react";

const subjects = [
  "Booking Issues",
  "Payment Problems",
  "Account Help",
  "Business Inquiries",
  "Other",
];

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Booking Issues",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit
  };

  const inputClass =
    "w-full bg-[#0d120e] border border-white/10 rounded-xl px-4 py-3 text-white text-base placeholder:text-white/25 outline-none focus:border-primary/40 hover:border-white/20 transition-colors";

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-8 lg:p-10">
      <h2 className="text-white text-[clamp(1.6rem,3vw,2rem)] font-medium mb-8">
        Send a Message
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white/55 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/55 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label className="text-white/55 text-sm">Subject</label>
          <div className="relative">
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={`${inputClass} appearance-none pr-10 cursor-pointer`}
            >
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-[#0d120e]">
                  {s}
                </option>
              ))}
            </select>
            {/* chevron */}
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-white/55 text-sm">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help you today?"
            rows={6}
            className={`${inputClass} resize-y min-h-35`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-[#061008] font-semibold text-base py-4 rounded-xl hover:opacity-85 active:scale-[0.99] transition-all mt-1"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
