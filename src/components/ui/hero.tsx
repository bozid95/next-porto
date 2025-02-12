import { useState, useEffect } from "react";
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMapPin,
} from "@tabler/icons-react";

export default function ProfileCard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi delay loading data (misalnya fetch dari API)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Profile Card */}
      <section className="relative flex flex-col md:flex-row items-center bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-lg">
        {/* Foto Profil */}
        <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full">
          {loading ? (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
          ) : (
            <Image
              src="/profil-picture.png"
              alt="Profile Picture"
              width={300}
              height={300}
              className="object-cover"
            />
          )}
        </div>

        {/* Informasi Profil */}
        <div className="ml-6 text-center md:text-right w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {loading ? (
              <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mx-auto md:mx-0" />
            ) : (
              "Widodo"
            )}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            {loading ? (
              <span className="inline-block w-32 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mx-auto md:mx-0" />
            ) : (
              "Backend Developer"
            )}
          </p>
          <div className="flex items-center justify-center md:justify-end text-gray-600 dark:text-gray-400 mt-2">
            {loading ? (
              <div className="w-48 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            ) : (
              <>
                <IconMapPin className="mr-1" /> Purworejo, Jawa Tengah,
                Indonesia
              </>
            )}
          </div>
          {/* Sosial Media */}
          <div className="flex mt-3 space-x-3 justify-center md:justify-end text-gray-700 dark:text-gray-300 text-2xl">
            {loading ? (
              <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
            ) : (
              <>
                <a
                  href="https://github.com/bozid95"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub className="hover:text-black dark:hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com/widodo-id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandLinkedin className="hover:text-blue-600" />
                </a>
                <a
                  href="https://instagram.com/wedoo.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandInstagram className="hover:text-pink-600" />
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
