"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

async function getPostData(id: string) {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PageProps) {
  const [data, setData] = useState<{ title: string; content: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getPostData(params.id)
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching post:", error))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) return <p className="text-center">Loading Post...</p>;

  // 🔹 Fungsi untuk parsing dan menampilkan kode dengan SyntaxHighlighter
  const renderContent = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return Array.from(doc.body.childNodes).map((node, index) => {
      if (node.nodeName === "PRE") {
        const codeElement = (node as Element).querySelector("code");
        if (codeElement) {
          const languageClass = codeElement.className || "";
          const language =
            languageClass.replace("language-", "") || "javascript";
          const codeText = codeElement.textContent || "";

          return (
            <SyntaxHighlighter
              key={index}
              language={language}
              style={dracula}
              className="rounded-md my-4"
            >
              {codeText}
            </SyntaxHighlighter>
          );
        }
      }
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: (node as Element).outerHTML }} />
      );
    });
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-white dark:bg-neutral-900 text-black dark:text-white">
      <Link
        href="/notes"
        className="inline-block mb-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to Blog List
      </Link>
      <h1 className="text-xl font-bold mb-4">{data?.title}</h1>
      <div className="border-l-4 border-gray-300 dark:border-neutral-700 pl-4 md:pl-6">
        {renderContent(data?.content || "")}
      </div>
    </main>
  );
}
