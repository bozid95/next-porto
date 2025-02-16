"use client"; // Pastikan berjalan di client

import LoadingIcon from "@/components/data/loading-icon";
import Link from "next/link";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  published: string;
  content: string;
};

const extractFirstImage = (htmlContent: string) => {
  const imgMatch = htmlContent.match(/<img [^>]*src="([^"]+)"[^>]*>/);
  return imgMatch ? imgMatch[1] : "/dummy.png";
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //Menampilkan gambar pada postingan

  posts.forEach((post) => {
    const postImage = extractFirstImage(post.content);
    setImageUrls([postImage]);
  });
  console.log(imageUrls);
  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
      const BLOG_ID = "2531488134356491737";

      try {
        const res = await fetch(
          `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to load article");
        }
        const data = await res.json();
        setPosts(data.items);

        // Pemetaan untuk ekstraksi URL gambar dari semua post

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [posts]);

  if (loading) return <LoadingIcon />;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-dark ">
      <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-pink-500 to-blue-900 via-purple-900 bg-clip-text text-transparent">
        Artikel
      </h1>
      <div className="border-l-4 border-gray-300 dark:border-neutral-700 pl-4">
        <ul className="space-y-6">
          {posts.length === 0 ? (
            <li className="text-center text-gray-500">No posts available</li>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="border-b pb-4">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-md text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))
          )}
        </ul>

        {imageUrls.map((url, index) => (
          <img src={url} alt="gambar" height={100} width={100} key={index} />
        ))}
      </div>
    </main>
  );
}
