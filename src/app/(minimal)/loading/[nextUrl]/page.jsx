"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const PaymentLoading = () => {
  const { nextUrl } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        router.push(`/${nextUrl}`);
        toast.success("Ticket Booked Successfully!!");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [router, nextUrl]);

  return (
    <section className="bg-bg-base absolute top-0 left-0 right-0 bottom-0 h-screen z-[100] w-full flex items-center justify-center">
      <Loader2 className="w-20 h-20 text-primary animate-spin" />
    </section>
  );
};

export default PaymentLoading;
