"use client"; // Pastikan berjalan di client

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  published: string;
  content: string;
};

async function getPosts(): Promise<Post[]> {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";

  try {
    const res = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&labels=Article`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();
    return data.items ?? [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading Notes...</div>;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-dark">
      <h1 className="text-xl font-bold mb-6">Notes</h1>
      <div className="border-l-4 border-gray-300 dark:border-neutral-700 pl-4">
        <ul className="space-y-6">
          {posts.length === 0 ? (
            <li className="text-center text-gray-500">No posts available</li>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="border-b pb-4">
                <Link
                  href={`/notes/${post.id}`}
                  className="text-md text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
