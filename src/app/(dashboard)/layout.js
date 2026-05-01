import DashboardHeader from "@/components/dashboard/dashboardHeader/DashboardHeader";
import DashboardNav from "@/components/dashboard/dashboardNav/DashboardNav";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <main className="flex h-[calc(100vh-73px)]">
        <DashboardNav />
        <section className="flex-1 p-6 md:p-10 min-w-0 overflow-y-auto relative overflow-x-hidden">
          <BlurCircle top="0px" right="-200px" />
          {children}
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;
