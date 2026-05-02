import Link from "next/link";

const SECTIONS = [
  { id: "collect", number: "01", title: "Information we collect" },
  { id: "use", number: "02", title: "How we use your data" },
  { id: "sharing", number: "03", title: "Sharing your information" },
  { id: "cookies", number: "04", title: "Cookies & tracking" },
  { id: "retention", number: "05", title: "Data retention" },
  { id: "rights", number: "06", title: "Your rights" },
  { id: "security", number: "07", title: "Security" },
  { id: "children", number: "08", title: "Children's privacy" },
  { id: "changes", number: "09", title: "Changes to this policy" },
  { id: "contact", number: "10", title: "Contact us" },
];

const SectionTitle = ({ number, title, id }) => (
  <div id={id} className="flex items-center gap-3 mb-5">
    <span className="text-primary/40 text-xs font-mono tracking-widest">
      {number}
    </span>
    <h2 className="text-white text-xl font-semibold">{title}</h2>
  </div>
);

const Prose = ({ children }) => (
  <p className="text-white/50 text-sm leading-relaxed mb-4">{children}</p>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2 mb-4">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-2.5 text-sm text-white/50 leading-relaxed"
      >
        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Highlight = ({ children }) => (
  <div className="border-l-2 border-primary/40 pl-4 py-1 my-4 bg-primary/5 rounded-r-lg">
    <p className="text-white/60 text-sm leading-relaxed italic">{children}</p>
  </div>
);

const SubLabel = ({ children }) => (
  <p className="text-white/70 text-sm font-medium mb-1.5 mt-4">{children}</p>
);

const Divider = () => <div className="border-t border-primary/10 my-10" />;

const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-[#080f0b] py-24">
      <div className="container-fluid max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="text-white/30 text-xs hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-primary/60 text-xs">Privacy Policy</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/60 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full mb-4">
                Legal
              </span>
              <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight">
                Privacy Policy
              </h1>
              <p className="text-white/40 text-base mt-3 max-w-xl leading-relaxed">
                We take your privacy seriously. This policy explains what data
                we collect, why we collect it, and how you can control it.
              </p>
            </div>

            <div className="flex gap-4 shrink-0">
              <div className="bg-[#0d1a14] border border-primary/10 rounded-xl px-4 py-3 text-center">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Effective
                </p>
                <p className="text-white text-sm font-medium">Jan 1, 2025</p>
              </div>
              <div className="bg-[#0d1a14] border border-primary/10 rounded-xl px-4 py-3 text-center">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Updated
                </p>
                <p className="text-white text-sm font-medium">May 2, 2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sticky TOC Sidebar */}
          <aside className="lg:sticky lg:top-24 w-full lg:w-56 shrink-0">
            <div className="bg-[#0d1a14] border border-primary/10 rounded-2xl p-5">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2.5 text-white/40 text-xs py-1.5 px-2 rounded-lg hover:bg-primary/10 hover:text-white/70 transition-all group"
                  >
                    <span className="text-primary/30 font-mono group-hover:text-primary/60 transition-colors">
                      {s.number}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 bg-[#0d1a14] border border-primary/10 rounded-2xl p-6 lg:p-10">
            {/* 01 */}
            <SectionTitle
              id="collect"
              number="01"
              title="Information we collect"
            />
            <Prose>
              We collect information you provide directly and data generated
              through your use of our service. This falls into three categories:
            </Prose>
            <SubLabel>Account information</SubLabel>
            <BulletList
              items={[
                "Name, email address, and password when you register",
                "Profile details you choose to add (avatar, bio, preferences)",
                "Billing information if you subscribe to a paid plan",
              ]}
            />
            <SubLabel>Usage data</SubLabel>
            <BulletList
              items={[
                "Pages visited, features used, and time spent on the platform",
                "Search queries, filters applied, and content interactions",
                "Device type, browser, operating system, and IP address",
              ]}
            />
            <SubLabel>Communications</SubLabel>
            <BulletList
              items={[
                "Messages you send to our support team",
                "Survey responses and feedback you voluntarily submit",
              ]}
            />

            <Divider />

            {/* 02 */}
            <SectionTitle id="use" number="02" title="How we use your data" />
            <Prose>
              We use the information we collect to provide, improve, and
              personalize our service.
            </Prose>
            <BulletList
              items={[
                "Authenticate your account and keep it secure",
                "Process transactions and send related notices",
                "Deliver the features and functionality you request",
                "Analyze usage patterns to improve performance and fix bugs",
                "Send service announcements and, where permitted, marketing emails",
                "Comply with legal obligations and enforce our terms",
              ]}
            />
            <Highlight>
              We never sell your personal data to advertisers or third-party
              data brokers. Full stop.
            </Highlight>

            <Divider />

            {/* 03 */}
            <SectionTitle
              id="sharing"
              number="03"
              title="Sharing your information"
            />
            <Prose>
              We share your data only in the following limited circumstances:
            </Prose>
            <BulletList
              items={[
                "Service providers — trusted vendors who help us operate (e.g. cloud hosting, email delivery, payment processing) under strict data-processing agreements",
                "Business transfers — in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction",
                "Legal requirements — when required by law, court order, or to protect the rights and safety of our users or the public",
                "With your consent — in any other case, only with your explicit permission",
              ]}
            />

            <Divider />

            {/* 04 */}
            <SectionTitle id="cookies" number="04" title="Cookies & tracking" />
            <Prose>
              We use cookies and similar technologies to keep you logged in,
              remember your preferences, and understand how you use our service.
            </Prose>
            <BulletList
              items={[
                "Essential cookies — required for the service to function; cannot be disabled",
                "Analytics cookies — help us understand usage patterns; can be opted out",
                "Preference cookies — remember your settings and language choice",
              ]}
            />
            <Prose>
              You can manage or delete cookies through your browser settings at
              any time. Disabling non-essential cookies will not affect core
              functionality.
            </Prose>

            <Divider />

            {/* 05 */}
            <SectionTitle id="retention" number="05" title="Data retention" />
            <Prose>
              We retain your personal data for as long as your account is active
              or as needed to provide our services. You may request deletion of
              your account at any time.
            </Prose>
            <BulletList
              items={[
                "Active account data is retained for the lifetime of the account",
                "After deletion, most data is purged within 30 days",
                "Billing records may be kept up to 7 years to meet legal and tax obligations",
                "Anonymized, aggregated analytics data may be retained indefinitely",
              ]}
            />

            <Divider />

            {/* 06 */}
            <SectionTitle id="rights" number="06" title="Your rights" />
            <Prose>
              Depending on your location, you may have the following rights
              regarding your personal data:
            </Prose>
            <BulletList
              items={[
                "Access — request a copy of the data we hold about you",
                "Correction — ask us to fix inaccurate or incomplete data",
                "Deletion — request erasure of your personal data (right to be forgotten)",
                "Portability — receive your data in a structured, machine-readable format",
                "Objection — opt out of certain processing activities, including marketing",
                "Restriction — ask us to limit how we use your data while a dispute is resolved",
              ]}
            />
            <Prose>
              To exercise any of these rights, contact us at the address below.
              We will respond within 30 days.
            </Prose>

            <Divider />

            {/* 07 */}
            <SectionTitle id="security" number="07" title="Security" />
            <Prose>
              We implement industry-standard safeguards to protect your data,
              including TLS encryption in transit, AES-256 encryption at rest,
              regular security audits, and access controls that limit who can
              view your information.
            </Prose>
            <Prose>
              No system is 100% secure. If you believe your account has been
              compromised, please contact us immediately.
            </Prose>

            <Divider />

            {/* 08 */}
            <SectionTitle
              id="children"
              number="08"
              title="Children's privacy"
            />
            <Prose>
              Our service is not directed to children under the age of 13 (or 16
              in the EU). We do not knowingly collect personal data from
              children. If we learn that we have collected data from a child
              without verifiable parental consent, we will delete it promptly.
            </Prose>
            <Prose>
              If you believe a child has provided us with their information,
              please contact us immediately.
            </Prose>

            <Divider />

            {/* 09 */}
            <SectionTitle
              id="changes"
              number="09"
              title="Changes to this policy"
            />
            <Prose>
              We may update this privacy policy from time to time. When we make
              significant changes, we will notify you by email or by displaying
              a prominent notice on our platform at least 14 days before the
              changes take effect.
            </Prose>
            <Prose>
              Your continued use of the service after the effective date
              constitutes your acceptance of the updated policy. We encourage
              you to review this page periodically.
            </Prose>

            <Divider />

            {/* 10 */}
            <SectionTitle id="contact" number="10" title="Contact us" />
            <Prose>
              If you have any questions, concerns, or requests related to this
              privacy policy, please reach out to our privacy team. We aim to
              respond within 2 business days.
            </Prose>

            {/* Contact card */}
            <div className="bg-[#080f0b] border border-primary/15 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div>
                <p className="text-white text-sm font-medium mb-0.5">
                  Privacy team
                </p>
                <p className="text-white/30 text-xs">
                  We respond to all privacy inquiries within 2 business days.
                </p>
              </div>
              <a
                href="mailto:privacy@yourcompany.com"
                className="text-primary text-sm font-mono bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors shrink-0"
              >
                privacy@yourcompany.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
