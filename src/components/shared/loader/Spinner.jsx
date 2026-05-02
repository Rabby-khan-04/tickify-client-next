import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <section className="bg-bg-base absolute top-0 left-0 right-0 bottom-0 h-screen z-100 w-full flex items-center justify-center">
      <Loader2 className="w-20 h-20 text-primary animate-spin" />
    </section>
  );
};

export default Spinner;
