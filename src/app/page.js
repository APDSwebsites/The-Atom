// pages/index.js
// app/page.js
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <h1></h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4"></h2>
          <div className="bg-gray-200 p-4 mb-8">
            <h3 className="text-xl font-semibold">Headline Goes Here</h3>
            <img
              src="/placeholder-image.jpg"
              alt=""
              className="w-full h-64 object-cover mb-4"
            />

            <p>
              Brief excerpt of the top story goes here. Click to read more...
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Latest Content</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 p-4">
                <h3 className="text-lg font-semibold">Article Title</h3>
                <p>Brief excerpt of the article content...</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Announcements & Ads</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-300 p-4 h-48">
                Ad {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
