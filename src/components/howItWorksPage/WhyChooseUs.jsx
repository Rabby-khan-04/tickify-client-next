import { Ticket, Zap, Lock, Armchair } from "lucide-react";

const features = [
  {
    Icon: Ticket,
    name: "Easy Ticket Booking",
    desc: "Find movies, select shows, and book seats in just a few clicks.",
  },
  {
    Icon: Zap,
    name: "Fast & Smooth Experience",
    desc: "Our platform is optimized for speed so you never miss a showtime.",
  },
  {
    Icon: Lock,
    name: "Secure Payments",
    desc: "All transactions are protected with trusted and encrypted payment systems.",
  },
  {
    Icon: Armchair,
    name: "Best Seat Selection",
    desc: "Choose your favorite seats with real-time availability updates.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle border border-border-subtle rounded-2xl overflow-hidden">
      {features.map(({ Icon, name, desc }) => (
        <div
          key={name}
          className="group p-8 flex flex-col gap-6 bg-bg-card hover:bg-bg-surface [transition:background-color_300ms_ease]"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 [transition:background-color_300ms_ease]">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-text-primary font-semibold text-base">
              {name}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyChooseUs;
