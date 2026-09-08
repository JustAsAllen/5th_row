import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { HorizontalTrack } from "@/components/landing/horizontal-track";
import { Stack } from "@/components/landing/stack";
import { SkillsHof } from "@/components/landing/skills-hof";
import { Footer } from "@/components/landing/footer";
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll-provider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="overflow-x-clip bg-[#111112]">
        <Navbar />
        <Hero />
        <Marquee
          items={[
            { text: "Control Center" },
            { text: "Toolkit Guide" },
            { text: "Supabase Backend" },
            { text: "7 Auto Skills" },
            { text: "Zero to Deploy" },
            { text: "Client Ready" },
          ]}
        />
        <HorizontalTrack />
        <Stack />
        <Marquee
          direction="right"
          className="border-y-0 border-b border-t-0"
          bg="bg-[#282C20]"
          items={[
            { text: "clone", className: "text-[#D2FF00]" },
            { text: "design", className: "text-[#F4F4ED]" },
            { text: "build", className: "text-[#D2FF00]" },
            { text: "test", className: "text-[#F4F4ED]" },
            { text: "scale", className: "text-[#D2FF00]" },
            { text: "ship", className: "text-[#F4F4ED]" },
          ]}
        />
        <SkillsHof />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}