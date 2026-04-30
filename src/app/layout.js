import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Tickify – Your Gateway to the Big Screen",
  description: "Your Gateway to the Big Screen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
