// pages/artists-events.js
//May get rid of entirely
import Layout from "../../components/Layout";

export default function ArtistsEvents() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Artists & Events</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 p-4">
              <h2 className="text-2xl font-bold mb-2">Event/Artist Title</h2>
              <p className="mb-4">Date: MM/DD/YYYY</p>
              <p>Description of the event or artist profile goes here...</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Ads</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
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
