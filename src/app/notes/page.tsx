"use client"; // Pastikan berjalan di client

import LoadingIcon from "@/components/data/loading-icon";
import { IconTerminal2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
};

async function fetchData(): Promise<
  { id: string; title: string; description: string; image: React.ReactNode }[]
> {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";

  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to load article");
  }
  const data = await res.json();
  return data.items.map((post: Post) => {
    const textContent = post.content.replace(/<[^>]+>/g, "");

    const imgMatch = post.content.match(
      /<a [^>]*href="(https:\/\/blogger\.googleusercontent\.com\/img\/[^"]+)"[^>]*>/
    );
    const imageUrl = imgMatch ? imgMatch[1] : "/dummy.png";
    return {
      id: post.id,
      title: post.title,
      description: textContent.split(" ").slice(0, 50).join(" ") + "...",
      image: imageUrl ? (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-auto h-auto"
          height={200}
          width={100}
        />
      ) : (
        <IconTerminal2 className="w-10 h-10 text-gray-600 dark:text-gray-300" />
      ),
    };
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<
    { id: string; title: string; description: string; image: React.ReactNode }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Menampilkan gambar pada postingan

  useEffect(() => {
    fetchData()
      .then(setPosts)
      .catch((err) => console.error("Error load article", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingIcon />;

  const ListBlog = ({
    id,
    title,
    description,
    image,
  }: {
    id: string;
    title: string;
    description: string;
    image: React.ReactNode;
  }) => {
    return (
      <ul>
        <li>
          <a href={`/notes/${id}`}>
            <h1>{title}</h1>
            <div>{image}</div>
            <p>{description}</p>
          </a>
        </li>
      </ul>
    );
  };

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
            posts.map((post) => <ListBlog key={post.id} {...post} />)
          )}
        </ul>
      </div>
    </main>
  );
}
