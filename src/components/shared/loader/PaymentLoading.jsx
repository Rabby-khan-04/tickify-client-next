"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

const PaymentLoading = () => {
  const router = useRouter();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (!nextUrl) return;

    const timer = setTimeout(() => {
      router.push(`/${nextUrl}`);
      toast.success("Ticket Booked Successfully!!");
    }, 6000);

    return () => clearTimeout(timer);
  }, [nextUrl, router]);

  return (
    <section className="bg-dark fixed inset-0 z-100 flex items-center justify-center">
      <Loader2 className="w-20 h-20 animate-spin text-primary" />
    </section>
  );
};

export default PaymentLoading;
