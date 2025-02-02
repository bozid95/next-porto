"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FloatingDock } from "@/components/ui/floating-dock";
import { linksMenu } from "@/components/data/menu";

type Post = {
  id: string;
  title: string;
  published: string;
  content: string;
};

async function getPostData(id: number): Promise<Post | null> {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default function BlogDetailPage({ params }: { params: { id: number } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getPostData(params.id)
      .then((data) => {
        if (!data) {
          router.push("/not-found"); // Redirect jika tidak ditemukan
        } else {
          setPost(data);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/not-found"); // Redirect jika ada error
        setLoading(false);
      });
  }, [params.id, router]);

  if (loading) return <div className="text-center">Loading Notes...</div>;

  if (!post) return null; // Jangan render apapun jika tidak ada post

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 bg-white dark:bg-neutral-900 shadow-md rounded-lg">
      {/* Tombol Back to List */}
      <div className="mt-8">
        <Link href="/notes" className="inline-block text-blue-600 hover:underline">
          Back to List
        </Link>
      </div>

      <h1 className="text-2xl font-bold">{post.title}</h1>
      <h3 className="text-sm text-gray-500 mb-6">{post.published}</h3>

      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose" />

      <FloatingDock items={linksMenu} />
    </main>
  );
}
