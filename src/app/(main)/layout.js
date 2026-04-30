import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default function HomeLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
