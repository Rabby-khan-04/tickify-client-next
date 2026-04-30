const Loader = () => {
  return (
    <section className="bg-dark absolute top-0 left-0 right-0 bottom-0 h-screen z-100 w-full flex items-center justify-center">
      <div className="">
        <div className="text-primary text-8xl flex items-center justify-center font-bold">
          {/* <Loader2 className="w-20 h-20 animate-spin" /> */}
          <span>Loading</span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
            .
          </span>
        </div>
      </div>
    </section>
  );
};

export default Loader;
