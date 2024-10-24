"use client";
import ArticleForm from "@/components/ArticleForm";
import Layout from "@/components/Layout";

export default function CreateArticle() {
  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
        <ArticleForm />
      </div>
    </Layout>
  );
}
