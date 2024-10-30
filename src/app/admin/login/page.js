"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (result?.ok) {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-2 p-2 border"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-4 p-2 border"
        placeholder="Password"
        required
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white">
        Login
      </button>
    </form>
  );
}
