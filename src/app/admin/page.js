"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === "super-admin";

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p className="mb-4">
        Logged in as: {session?.user?.email} ({session?.user?.role})
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Available to both admin and super-admin */}
        <Link
          href="/admin/create-article"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Create Article</h2>
          <p className="text-gray-600">Write and publish new articles</p>
        </Link>

        <Link
          href="/admin/manage-articles"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
          <p className="text-gray-600">Edit or delete existing articles</p>
        </Link>

        <Link
          href="/admin/media-library"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Media Library</h2>
          <p className="text-gray-600">Manage uploaded images and files</p>
        </Link>

        {/* Super-admin only features */}
        {isSuperAdmin && (
          <>
            <Link
              href="/admin/manage-admins"
              className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Manage Admins</h2>
              <p className="text-gray-600">Add or remove admin users</p>
            </Link>

            <Link
              href="/admin/settings"
              className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Site Settings</h2>
              <p className="text-gray-600">Manage global site configuration</p>
            </Link>

            <Link
              href="/admin/analytics"
              className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Analytics</h2>
              <p className="text-gray-600">View site statistics and reports</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
