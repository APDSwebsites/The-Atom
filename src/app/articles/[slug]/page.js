import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";
import { notFound } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";

export default async function ArticlePage({ params }) {
  await dbConnect();
  const article = await Article.findOne({ _id: params.slug }).lean();

  if (!article) {
    notFound();
  }

  const renderBlock = (block, index) => {
    if (block.type === "text") {
      return (
        <div key={index} className="prose max-w-none mb-8">
          {block.text}
        </div>
      );
    }

    if (block.type === "image" && block.imageData) {
      return (
        <figure key={index} className="mb-8">
          <div className="relative w-full h-96">
            <Image
              src={`data:${block.imageData.contentType};base64,${block.imageData.base64Data}`}
              alt={block.caption || "Article image"}
              fill
              className="object-contain"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-gray-600 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  };

  return (
    <Layout>
    <article className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 mb-4">
        By {article.author} •{" "}
        {new Date(article.publishDate).toLocaleDateString()}
      </div>
      {article.tags?.length > 0 && (
        <div className="flex gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-8">
        {article.content.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
    </article>

    </Layout>
  );
}
