import check from "@/../public/icon/chek-circle.png";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <main className="h-screen relative overflow-hidden flex items-center justify-center">
      <BlurCircle top="-100px" right="-100px" />
      <div className="container-fluid">
        <div className="max-w-sm mx-auto text-white text-center">
          <SectionTitle title="Payment Success" />
          <Image
            src={check}
            width={200}
            height={200}
            className="inline-block mb-10"
            alt=""
          />
          <div className="space-y-5">
            <Link href="/dashboard/bookings" className="btn w-full text-center">
              View Ticket
            </Link>
            <Link href="/" className="btn-alt w-full text-center">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default PaymentSuccess;
