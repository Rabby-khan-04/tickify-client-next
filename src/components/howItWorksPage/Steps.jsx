import { Tv2, LayoutGrid, Clock, CreditCard } from "lucide-react";

const steps = [
  {
    Icon: Tv2,
    num: "01",
    name: "Select Movie",
    desc: "Browse our collection of the latest blockbusters and pick your favorite.",
  },
  {
    Icon: LayoutGrid,
    num: "02",
    name: "Select Theater",
    desc: "Choose from a variety of premium theaters near your location.",
  },
  {
    Icon: Clock,
    num: "03",
    name: "Choose Date & Time",
    desc: "Pick a convenient showtime that fits your schedule perfectly.",
  },
  {
    Icon: CreditCard,
    num: "04",
    name: "Select Seat & Pay",
    desc: "Pick your preferred seat and complete your booking with secure payment options.",
  },
];

const Steps = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map(({ Icon, num, name, desc }) => (
        <div
          key={num}
          className="group bg-bg-card border border-border-subtle rounded-2xl p-8 flex flex-col items-center text-center gap-5 hover:border-primary/20 [transition:border-color_300ms_ease,background-color_300ms_ease]"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 [transition:background-color_300ms_ease]">
            <Icon className="w-6 h-6 text-primary" strokeWidth={1.6} />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-text-muted">
              Step {num}
            </p>
            <h3 className="text-text-primary font-semibold text-base">
              {name}
            </h3>
          </div>
          <p className="text-text-secondary text-base leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Steps;
