"use client";
import HomeSection from "@/components/homesection/homeSection";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <NavBar />
      <HomeSection />
    </main>
  );
}
