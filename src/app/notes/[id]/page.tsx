"use client";

import { useState, useEffect, use } from "react";

async function getPostData(id: string) {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (unwrappedParams.id) {
      getPostData(unwrappedParams.id)
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching post:", error))
        .finally(() => setLoading(false));
    }
  }, [unwrappedParams.id]);

  if (loading) return <p className="text-center">Loading Post...</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-white dark:bg-neutral-900 text-black dark:text-white">
      <h1 className="text-xl font-bold mb-4">{data?.title}</h1>
      <div className="border-l-4 border-gray-300 dark:border-neutral-700 pl-4 md:pl-6">
        <div
          dangerouslySetInnerHTML={{ __html: data?.content || "" }}
          className="prose dark:prose-invert"
        />
      </div>
    </main>
  );
}