import { Mail, Phone, MapPin } from "lucide-react";

const cards = [
  {
    Icon: Mail,
    title: "Email Support",
    desc: "Our support team typically responds within 2 hours during business hours.",
    detail: "support@tickify.com",
    isLink: true,
    href: "mailto:support@tickify.com",
  },
  {
    Icon: Phone,
    title: "Call Us",
    desc: "Available Mon-Fri, 9am – 10pm for immediate booking assistance.",
    detail: "+1 (888) TICKIFY-NOW",
    isLink: true,
    href: "tel:+18888425439",
  },
  {
    Icon: MapPin,
    title: "Headquarters",
    desc: "Visit our design studio and administrative office in the heart of the tech district.",
    detail: "123 Cine-Tech Blvd, Suite 400\nSan Francisco, CA 94103",
    isLink: false,
  },
];

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      {cards.map(({ Icon, title, desc, detail, isLink, href }) => (
        <div
          key={title}
          className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-7 flex gap-5 hover:border-primary/20 transition-colors duration-300"
        >
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.7} />
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-primary font-semibold text-base">{title}</h3>

            <p className="text-white/45 text-base leading-relaxed">{desc}</p>

            {isLink ? (
              <a
                href={href}
                className="text-primary text-sm font-medium hover:opacity-75 transition-opacity mt-1"
              >
                {detail}
              </a>
            ) : (
              <p className="text-white/60 text-sm leading-relaxed mt-1 whitespace-pre-line">
                {detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
