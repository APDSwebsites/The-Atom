"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/create-article"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Create New Article</h2>
          <p className="text-gray-600">
            Write and publish a new article with images
          </p>
        </Link>

        <Link
          href="/admin/manage-articles"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
          <p className="text-gray-600">
            Edit, delete, or unpublish existing articles
          </p>
        </Link>

        <Link
          href="/admin/media"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Media Library</h2>
          <p className="text-gray-600">Manage uploaded images and files</p>
        </Link>
      </div>
    </div>
  );
}
