"use client";

import LoadingIcon from "@/components/data/loading-icon";
import HeroSection from "@/components/ui/hero";
import { useState, useEffect } from "react";

async function getProfileData() {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/pages/1121065789300202390?key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default function ProfilePage() {
  const [data, setData] = useState<{ title: string; content: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileData()
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching profile:", error))
      .finally(() => setLoading(false));
  }, []); // ✅ Fetch hanya dilakukan sekali saat komponen pertama kali dimuat

  if (loading) return <LoadingIcon />;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-white dark:bg-neutral-900 text-black dark:text-white">
      {/* 🔹 Skeleton untuk Judul */}

      <HeroSection />
      {loading ? (
        <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mb-2" />
      ) : (
        <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-pink-500 to-blue-900 via-purple-900 bg-clip-text text-transparent">
          {data?.title}
        </h1>
      )}

      <div className="border-l-4 border-gray-300 dark:border-neutral-700 pl-4 md:pl-6">
        {/* 🔹 Skeleton untuk Konten */}
        {loading ? (
          <div className="space-y-3">
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            className="prose dark:prose-invert prose-a:text-blue-500 prose-a:underline hover:prose-a:text-blue-700"
          />
        )}
      </div>
    </main>
  );
}

export function BothPage() {}
