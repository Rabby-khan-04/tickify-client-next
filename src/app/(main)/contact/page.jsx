import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import SupportTopics from "@/components/contact/SupportTopics";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import theaterImg from "@/../public/image/theater.png";

const ContactPage = () => {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${theaterImg.src})`,
        }}
      >
        <div className="absolute inset-0 bg-[#060d08]/90">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(29,231,130,0.08)_0%,transparent_65%)]" />
        </div>
        <div className="relative z-10 px-6">
          <h1 className="text-primary  text-[clamp(2rem,3vw,80px)] font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-white/55 text-base max-w-md leading-relaxed">
            We{"'"}re here to ensure your cinematic experience is flawless.
            Reach out to our dedicated support team for any assistance.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-20 relative z-30 overflow-x-hidden">
        <BlurCircle top="0px" right="-200px" />
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-4">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Support Topics */}
      <SupportTopics />
    </div>
  );
};

export default ContactPage;
