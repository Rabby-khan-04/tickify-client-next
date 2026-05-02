import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import MainSectionTitle from "@/components/shared/mainSectionTitle/MainSectionTitle";
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
    <section className="p-yaxis relative z-30 overflow-x-hidden">
      <div className="container-fluid">
        <BlurCircle top="100px" left="-200px" />

        <MainSectionTitle
          subtitle="Better Experience"
          title="Why Movie Lovers Choose Our Platform"
          description="We make movie booking fast, simple, and enjoyable. From seat selection
          to secure payment, everything is designed to give you a smooth cinema
          experience without any hassle."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle border border-border-subtle mx-6 rounded-2xl overflow-hidden">
          {features.map(({ Icon, name, desc }, idx) => (
            <div
              key={idx}
              className="group p-8 flex flex-col gap-6 bg-bg-card hover:bg-bg-surface transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/15">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-text-primary text-[clamp(1.6rem,3vw,2rem)] font-medium">
                  {name}
                </h3>
                <p className="text-text-secondary text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
