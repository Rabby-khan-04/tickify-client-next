"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useContactSubmit from "@/hooks/useContactSubmit";

const subjects = [
  "Booking Issues",
  "Payment Problems",
  "Account Help",
  "Business Inquiries",
  "Other",
];

const inputBase =
  "w-full bg-[#0d120e] border rounded-xl px-4 py-3 text-white text-base placeholder:text-white/25 outline-none hover:border-white/20 transition-colors";
const inputNormal = `${inputBase} border-white/10 focus:border-primary/40`;
const inputError = `${inputBase} border-red-500/60 focus:border-red-500/80 bg-red-500/5`;

const ContactForm = () => {
  const {
    submitContact,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useContactSubmit();

  const [dismissed, setDismissed] = useState(false);
  const [serverError, setServerError] = useState("");
  const dismissTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "Booking Issues",
      message: "",
    },
  });

  useEffect(() => {
    if (!isSuccess) return;

    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }

    dismissTimerRef.current = setTimeout(() => {
      resetMutation();
    }, 5000);

    return () => {
      clearTimeout(dismissTimerRef.current);
    };
  }, [isSuccess, resetMutation]);

  const showSuccess = isSuccess && !dismissed;

  const onSubmit = (data) => {
    setServerError("");
    submitContact(data, {
      onSuccess: () => {
        reset();
        toast.success("Message sent! We'll get back to you soon.");
      },
      onError: (error) => {
        const msg =
          error?.response?.data?.message ||
          "Something went wrong. Please try again.";
        setServerError(msg);
        toast.error(msg);
      },
    });
  };

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-8 lg:p-10">
      <h2 className="text-white text-[clamp(1.6rem,3vw,2rem)] font-medium mb-8">
        Send a Message
      </h2>

      {/* Success banner — auto-dismisses after 5s */}
      {showSuccess && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 px-4 py-3 bg-primary/10 border border-primary/30 rounded-xl text-primary text-sm flex items-center justify-between gap-3"
        >
          <span>
            ✅ Your message has been sent! We{"'"}ll get back to you soon.
          </span>
          <button
            onClick={() => {
              setDismissed(true);
              clearTimeout(dismissTimerRef.current);
              resetMutation();
            }}
            aria-label="Dismiss"
            className="text-primary/50 hover:text-primary transition-colors shrink-0 text-base leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* Server error banner */}
      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center justify-between gap-3"
        >
          <span>{serverError}</span>
          <button
            onClick={() => setServerError("")}
            aria-label="Dismiss error"
            className="text-red-400/50 hover:text-red-400 transition-colors shrink-0 text-base leading-none"
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-white/55 text-sm">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              placeholder="John Doe"
              className={errors.name ? inputError : inputNormal}
              {...register("name", {
                required: "Full name is required.",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters.",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters.",
                },
              })}
            />
            {errors.name && (
              <p
                id="contact-name-error"
                role="alert"
                className="text-xs text-red-400"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-white/55 text-sm">
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
              placeholder="john@example.com"
              className={errors.email ? inputError : inputNormal}
              {...register("email", {
                required: "Email address is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p
                id="contact-email-error"
                role="alert"
                className="text-xs text-red-400"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-subject" className="text-white/55 text-sm">
            Subject <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-subject"
              aria-required="true"
              aria-invalid={!!errors.subject}
              className={`${errors.subject ? inputError : inputNormal} appearance-none pr-10 cursor-pointer`}
              {...register("subject", { required: "Please select a subject." })}
            >
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-[#0d120e]">
                  {s}
                </option>
              ))}
            </select>
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
          {errors.subject && (
            <p role="alert" className="text-xs text-red-400">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-white/55 text-sm">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "contact-message-error" : "contact-message-hint"
            }
            placeholder="How can we help you today?"
            rows={6}
            className={`${errors.message ? inputError : inputNormal} resize-y min-h-35`}
            {...register("message", {
              required: "Message is required.",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters.",
              },
              maxLength: {
                value: 1000,
                message: "Message cannot exceed 1000 characters.",
              },
            })}
          />
          <p id="contact-message-hint" className="text-xs text-white/30">
            Min 10 characters, max 1000.
          </p>
          {errors.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="text-xs text-red-400"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="w-full bg-primary text-[#061008] font-semibold text-base py-4 rounded-xl hover:opacity-85 active:scale-[0.99] transition-all mt-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-[#061008] border-t-transparent animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
