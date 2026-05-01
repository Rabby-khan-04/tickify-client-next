import { Ticket, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import MainSectionTitle from "../shared/mainSectionTitle/MainSectionTitle";

const topics = [
  {
    Icon: Ticket,
    title: "Booking Issues",
    desc: "Need help with seat selection or didn't receive your e-ticket? We've got you covered.",
    href: "/support/booking",
  },
  {
    Icon: Users,
    title: "Account Help",
    desc: "Problems with login, loyalty points, or updating your profile information.",
    href: "/support/account",
  },
  {
    Icon: Briefcase,
    title: "Business Inquiries",
    desc: "Partner with Tickify for theater listings, advertisements, or corporate events.",
    href: "/support/business",
  },
];

const SupportTopics = () => {
  return (
    <section className="py-20 relative z-30 overflow-x-hidden">
      <BlurCircle bottom="0px" left="-200px" />
      <div className="container-fluid">
        {/* Header */}
        <MainSectionTitle
          subtitle="Need Help Fast?"
          title="Support Topics"
          description="Find quick answers to the most common questions about booking, payments, cancellations, and account management. Everything you need to solve issues faster without waiting for support."
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topics.map(({ Icon, title, desc, href }) => (
            <div
              key={title}
              className="group bg-[#0d120e] border border-white/[0.07] rounded-2xl p-8 flex flex-col items-center text-center gap-5 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Icon className="w-6 h-6 text-primary" strokeWidth={1.6} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-white font-semibold text-base">{title}</h3>
                <p className="text-white/40 text-base leading-relaxed">
                  {desc}
                </p>
              </div>

              <Link
                href={href}
                className="flex items-center gap-1.5 text-primary text-sm font-medium mt-auto hover:gap-3 transition-all duration-200"
              >
                View Articles
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportTopics;
