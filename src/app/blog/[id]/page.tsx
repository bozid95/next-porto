"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

async function getPostData(id: string) {
  const API_KEY = "AIzaSyC0NYs0vzrlklopzeDMW2mZvWTJ3z-y5iE";
  const BLOG_ID = "2531488134356491737";
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default function PostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [data, setData] = useState<{ title: string; content: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      getPostData(postId)
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching post:", error))
        .finally(() => setLoading(false));
    }
  }, [postId]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-4 py-6 md:py-4 pt-4 md:pt-4 bg-white dark:bg-neutral-900 text-black dark:text-white">
      <Link
        href="/notes"
        className="inline-block mb-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to Blog List
      </Link>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-pink-500 to-blue-900 via-purple-900 bg-clip-text text-transparent">
            {data?.title}
          </h1>
          <h1 className="text-sm mb-5 bg-gradient-to-r from-slate-500 to-blue-900 via-purple-900 bg-clip-text text-transparent">
            Written by Widodo
          </h1>
          <div className="border-l-4 border-gray-300 dark:border-neutral-700 pl-4 md:pl-6">
            {renderContent(data?.content || "")}
          </div>
        </>
      )}
    </main>
  );
}

const renderContent = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return Array.from(doc.body.childNodes).map((node, index) => {
    if (node.nodeName === "PRE") {
      const codeElement = (node as Element).querySelector("code");
      if (codeElement) {
        const languageClass = codeElement.className || "";
        const language = languageClass.replace("language-", "") || "javascript";
        const codeText = codeElement.textContent || "";

        return (
          <SyntaxHighlighter
            key={index}
            language={language}
            style={materialDark}
            className="rounded-md my-4"
          >
            {codeText}
          </SyntaxHighlighter>
        );
      }
    }

    if (node.nodeName === "TABLE") {
      return (
        <div key={index} className="overflow-x-auto my-4">
          <table
            className="min-w-full border border-gray-300 dark:border-neutral-700"
            dangerouslySetInnerHTML={{ __html: (node as Element).innerHTML }}
          />
        </div>
      );
    }

    return (
      <div
        key={index}
        dangerouslySetInnerHTML={{ __html: (node as Element).outerHTML }}
      />
    );
  });
};
