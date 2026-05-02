const FaqItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isOpen
          ? "border-primary/60 bg-primary/5"
          : "border-border-subtle bg-bg-card"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h3
          className={`text-base font-medium transition-colors duration-300 ${
            isOpen ? "text-primary" : "text-text-primary"
          }`}
        >
          {faq.question}
        </h3>

        <div
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-primary border-primary text-dark rotate-45"
              : "bg-transparent border-border-subtle text-text-muted"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-text-secondary text-sm leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default FaqItem;
