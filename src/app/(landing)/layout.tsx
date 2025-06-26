import Footer from "@/components/LandingPage/Footer";
import { Navbar } from "@/components/LandingPage/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <Navbar />
    {children}
    <Footer />
    
  </>;
}
