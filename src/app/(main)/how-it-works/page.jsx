import theaterImg from "@/../public/image/theater-2.png";
import CtaBanner from "@/components/howItWorksPage/CtaBanner";
import Steps from "@/components/howItWorksPage/Steps";
import WhyChooseUs from "@/components/howItWorksPage/WhyChooseUs";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import MainSectionTitle from "@/components/shared/mainSectionTitle/MainSectionTitle";

const HowItWorksPage = () => {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${theaterImg.src})` }}
      >
        <div className="absolute inset-0 bg-[#060d08]/85">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(29,231,130,0.07)_0%,transparent_65%)]" />
        </div>

        <div className="relative z-10 px-6 flex flex-col items-start max-w-xl text-center">
          <h1 className="text-primary  text-[clamp(2rem,3vw,80px)] font-bold mb-4">
            Elevate Your Cinema Night
          </h1>
          <p className="text-white/55 text-base leading-relaxed">
            Experience movies as they were meant to be seen with Tickify{"'"}s
            premium theater network and seamless booking experience.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 relative z-30 overflow-x-hidden">
        <BlurCircle top="0px" right="-200px" />
        <div className="container-fluid">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/35 mb-3">
              Experience Flow
            </p>
            <h2 className="text-white text-[clamp(1.6rem,3vw,2rem)] font-medium mb-4">
              Book Your Ticket in 4 Easy Steps
            </h2>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
          </div>
          <Steps />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative z-30 overflow-x-hidden">
        <div className="container-fluid">
          <MainSectionTitle
            subtitle="Better Experience"
            title="Why Movie Lovers Choose Our Platform"
            description="We make movie booking fast, simple, and enjoyable. From seat selection to secure payment, everything is designed to give you a smooth cinema experience without any hassle."
          />
          <WhyChooseUs />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-20 relative z-30 overflow-x-hidden">
        <div className="container-fluid">
          <CtaBanner />
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
