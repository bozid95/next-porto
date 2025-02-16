"use client";
import ProfilePage from "./profile/page";
import BlogPages from "./blog/page";
import ProjectPage from "./projects/page";
import HeroSection from "@/components/ui/hero";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-white dark:bg-neutral-900 text-black dark:text-white bord ">
      <HeroSection />
      <ProfilePage />
      <ProjectPage />
      <BlogPages />
    </div>
  );
}
