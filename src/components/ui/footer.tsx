"use client";

import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl bg-white dark:bg-black shadow-md py-4 mx-auto">
      <div className="max-w-5xl w-full mx-auto px-6 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} Widodo. All rights reserved.
        </p>

        {/* Social Media */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/bozid95"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="w-5 h-5 hover:text-black dark:hover:text-white transition duration-300" />
          </Link>
          <Link
            href="https://linkedin.com/in/widodo-id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin className="w-5 h-5 hover:text-blue-600 transition duration-300" />
          </Link>
          <Link
            href="https://instagram.com/wedoo.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandInstagram className="w-5 h-5 hover:text-pink-600 transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
