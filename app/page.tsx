import { redirect } from "next/navigation";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <div className="relative">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
