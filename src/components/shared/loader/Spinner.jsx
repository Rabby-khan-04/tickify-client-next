import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <section className="bg-dark absolute top-0 left-0 right-0 bottom-0 h-screen z-100 w-full flex items-center justify-center">
      <div className="">
        <div className="text-primary text-8xl flex items-center justify-center font-bold">
          <Loader2 className="w-20 h-20 animate-spin" />
        </div>
      </div>
    </section>
  );
};

export default Spinner;
