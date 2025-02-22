"use client"; // Pastikan berjalan di client

import LoadingIcon from "@/components/data/loading-icon";
import { IconTerminal2 } from "@tabler/icons-react";
import Image from "next/image";
import { useTheme } from "next-themes";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string;
  published: string;
  author: {
    image: {
      url: string;
    };
    displayName: string;
  };
  blog: string[];
};

async function fetchData(): Promise<
  {
    id: string;
    title: string;
    description: string;
    authorName: string;
    tanggal: string;
    authorImage: string;
    image: React.ReactNode;
  }[]
> {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE",
    BLOG_ID = "2531488134356491737";

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
    const textContent = post.content
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ");

    const imgMatch = post.content.match(
      /<a [^>]*href="(https:\/\/blogger\.googleusercontent\.com\/img\/[^"]+)"[^>]*>/
    );
    const imageUrl = imgMatch ? imgMatch[1] : "/dummy.png";
    return {
      id: post.id,

      title: post.title,
      tanggal: post.published,
      authorImage: post.author.image.url,
      authorName: post.author.displayName,
      description: textContent.split(" ").slice(0, 50).join(" ") + "...",
      image: imageUrl ? (
        <Image
          src={imageUrl}
          alt={post.title}
          className="w-auto h-auto"
          height={1200}
          width={1200}
        />
      ) : (
        <IconTerminal2 className="w-10 h-10 text-gray-600 dark:text-gray-300" />
      ),
    };
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<
      {
        id: string;
        title: string;
        description: string;
        authorImage: string;
        authorName: string;
        tanggal: string;
        image: React.ReactNode;
      }[]
    >([]),
    [loading, setLoading] = useState(true),
    [mounted, setMounted] = useState(false),
    { resolvedTheme } = useTheme();
  // Menampilkan gambar pada postingan

  useEffect(() => {
    fetchData()
      .then(setPosts)
      .catch((err) => console.error("Error load article", err))
      .finally(() => setLoading(false));

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (loading) return <LoadingIcon />;

  function formatTanggal(tanggal: string) {
    const date = new Date(tanggal);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(0);

    return `${dd}-${mm}-${yy}`;
  }

  const ListBlog = ({
    id,
    title,
    description,
    image,
    tanggal,
    authorName,
    authorImage,
  }: {
    id: string;
    title: string;
    description: string;
    tanggal: string;
    authorImage: string;
    authorName: string;
    image: React.ReactNode;
  }) => {
    return (
      <ul className="space-y-6">
        <li
          className={`py-5 px-5 transition delay-50 ease-in ${
            resolvedTheme === "dark"
              ? "hover:bg-[#292929]"
              : "hover:bg-[#f0f0f0]"
          }   hover:border hover:rounded-lg`}
        >
          <Link href={`/notes/${id}`}>
            <h1 className=" text-3xl">{title}</h1>
            <div className="flex items-baseline justify-between">
              <span className="flex items-baseline justify-center gap-2">
                <p className="relative ">By: {authorName}</p>
                <Image
                  src={`https://${authorImage}`}
                  alt={authorName}
                  height={100}
                  width={100}
                  className="w-auto h-auto relative top-3.5 rounded-full"
                />
              </span>
              <p className="">{formatTanggal(tanggal)}</p>
            </div>
            <div className="py-5">{image}</div>
            <p className="py-2">{description}</p>
          </Link>
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
        {posts.length === 0 ? (
          <li className="text-center text-gray-500">No posts available</li>
        ) : (
          posts.map((post) => <ListBlog key={post.id} {...post} />)
        )}
      </div>
    </main>
  );
}
