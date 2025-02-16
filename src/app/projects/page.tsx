"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { IconTerminal2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import LoadingIcon from "@/components/data/loading-icon";

// Buat interface untuk post dari API Blogger
interface Post {
  id: string;
  title: string;
  content: string;
}

// Konstanta API Blogger
const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
const BLOG_ID = "2531488134356491737";

// Fungsi untuk mengambil data artikel
async function getFeatureArticles(): Promise<
  { id: string; title: string; description: string; icon: React.ReactNode }[]
> {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&labels=Projects`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch features");

  const data = await res.json();

  return data.items.map((post: Post) => {
    // Ambil gambar pertama dari content menggunakan regex
    const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
    const imageUrl = imgMatch ? imgMatch[1] : null;

    return {
      id: post.id,
      title: post.title,
      icon: imageUrl ? (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-40 rounded-md object-cover"
        />
      ) : (
        <IconTerminal2 className="w-10 h-10 text-gray-600 dark:text-gray-300" />
      ),
    };
  });
}

export default function ProjectPage() {
  const [features, setFeatures] = useState<
    { id: string; title: string; description: string; icon: React.ReactNode }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeatureArticles()
      .then(setFeatures)
      .catch((error) => console.error("Error fetching features:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-white dark:bg-neutral-900 text-black dark:text-white">
      {/* 🔹 Skeleton untuk Judul */}
      {loading ? (
        <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mb-2" />
      ) : (
        <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-pink-500 to-blue-900 via-purple-900 bg-clip-text text-transparent">
          Projects
        </h1>
      )}

      {/* 🔹 Skeleton untuk Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-0 py-4 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonFeature key={index} />
            ))
          : features.map((feature, index) => (
              <Feature key={feature.id} {...feature} index={index} />
            ))}
      </div>
    </main>
  );
}

// 🔹 Skeleton Card
const SkeletonFeature = () => {
  return (
    <div className="flex flex-col h-full py-10 relative z-0 group/feature dark:border-neutral-800 animate-pulse">
      <div className="mb-4 px-10">
        <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="text-lg font-bold mb-2 px-10">
        <div className="w-32 h-5 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="text-sm px-10 flex-grow">
        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="px-10 mt-auto">
        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  );
};

// 🔹 Komponen fitur individu
const Feature = ({
  id,
  title,
  description,
  icon,
  index,
}: {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full lg:border-r py-10 relative z-0 group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 ? (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      ) : (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-0 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-0 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-0 px-10 flex-grow">
        {description}
      </p>
      <div className="px-10 mt-auto flex justify-end relative z-0">
        <a href={`/notes/${id}`} rel="noopener noreferrer">
          <Button className="bg-blue-600 text-white hover:bg-blue-500">
            View
          </Button>
        </a>
      </div>
    </div>
  );
};
