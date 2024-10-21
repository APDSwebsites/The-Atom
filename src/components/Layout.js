"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#ECE7CA]">
      <Head>
        <title>The Atom - West Texas Arts & Culture</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="relative w-full h-40 md:h-60">
        <Image
          src="/images/the-atom-header-best.jpg"
          alt="The Atom Header"
          layout="fill"
          objectFit="cover"
          priority
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Atom
            </h1>
            <p className="text-sm md:text-base text-white">
              West Texas Arts & Culture for the Progressive Element
            </p>
          </div>
        </div>
        <div className="absolute top-4 left-4 w-16 h-16 md:w-24 md:h-24">
          <Image
            src="/images/the-atom-logo.jpg"
            alt="The Atom Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </header>

      <nav className="bg-[#f07c34] text-black">
        <div className="container mx-auto py-2">
          <ul
            className={`flex ${isMobile ? "flex-col" : "flex-row space-x-4"}`}
          >
            <li className={isMobile ? "mb-2" : ""}>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className={isMobile ? "mb-2" : ""}>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li className={isMobile ? "mb-2" : ""}>
              <Link href="/artists-events" className="hover:text-gray-300">
                Artists & Events
              </Link>
            </li>
            <li className={isMobile ? "mb-2" : ""}>
              <Link href="/archive" className="hover:text-gray-300">
                Archive
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow container mx-auto py-8 px-4 md:px-0">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>Published by Atom Media</p>
        </div>
      </footer>
    </div>
  );
}
