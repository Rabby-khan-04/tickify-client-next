"use client";

import { Mail, Rocket, Ticket, MonitorPlay } from "lucide-react";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import { useState } from "react";
import Image from "next/image";
import seatImage from "@/../public/image/seats.png";

const perks = [
  {
    Icon: Rocket,
    name: "Priority Access",
    desc: "Get ticket links 24 hours before the general public for major releases.",
  },
  {
    Icon: Ticket,
    name: "Member Rewards",
    desc: "Earn points for every ticket purchased and unlock exclusive theater perks.",
  },
  {
    Icon: MonitorPlay,
    name: "Secret Screenings",
    desc: "Exclusive invites to unlisted screenings and cinematic Q&A events.",
  },
];

const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // handle subscribe logic
    setEmail("");
  };

  return (
    <section
      className="p-yaxis relative z-30 overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${seatImage.src})` }}
    >
      <div className="absolute inset-0 bg-[#060d08]/85 z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(29,231,130,0.07)_0%,transparent_65%)]" />
      </div>
      <BlurCircle top="100px" right="-200px" />
      <div className="container-fluid space-y-4 relative z-40">
        {/* Newsletter card */}
        <div className="relative border border-white/10 rounded-2xl px-6 py-14 flex flex-col items-center text-center overflow-hidden bg-[#0d120e]">
          {/* subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(29,231,130,0.07)_0%,transparent_65%)] pointer-events-none" />

          {/* Mail icon circle */}
          <div className="w-16 h-16 rounded-full bg-[#0f1f14] border border-primary/20 flex items-center justify-center mb-8">
            <Mail className="w-7 h-7 text-primary" strokeWidth={1.6} />
          </div>

          <h2 className="text-white text-[clamp(1.6rem,3vw,2rem)] font-medium mb-3">
            Get Exclusive Movie Updates
          </h2>
          <p className="text-white/45 text-sm leading-relaxed max-w-md mb-8">
            Be the first to know. Subscribe now for early access to blockbuster
            premieres, secret screenings, and member-only cinematic offers.
          </p>

          {/* Email form */}
          <form
            onSubmit={handleSubscribe}
            className="flex items-stretch gap-3 w-full max-w-lg mb-6"
          >
            <div className="flex-1 flex items-center gap-3 bg-[#111810] border border-white/10 rounded-xl px-4 hover:border-white/20 focus-within:border-primary/40 transition-colors">
              <span className="text-white/30 text-base">@</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your cinematic email"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none py-3.5"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-[#061008] text-sm font-semibold px-6 rounded-xl hover:opacity-85 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </button>
          </form>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-[#0d120e] object-cover"
                  width={40}
                  height={40}
                />
              ))}
            </div>
            <span className="text-white/45 text-sm">
              Join 50,000+ movie enthusiasts
            </span>
          </div>
        </div>

        {/* Perks row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {perks.map(({ Icon, name, desc }, idx) => (
            <div
              key={idx}
              className="group bg-[#0d120e] border border-white/[0.07] rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
