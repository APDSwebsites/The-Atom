// pages/about.js
import Layout from "../../components/Layout";

import Image from "next/image";

export default function About() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">About Us</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Purpose & History</h2>
        <p>Information about The Atom`s purpose and history goes here...</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Contributors</h2>
      <div className="grid grid-cols-2 gap-8">
        {["Editor", "Artistic Designer", "Contributor 1", "Contributor 2"].map(
          (role) => (
            <div key={role} className="bg-gray-100 p-4">
              <h3 className="text-xl font-semibold mb-2">{role}</h3>
              <div className="flex">
                <Image
                  src="/images/the-atom-header-best.jpg"
                  alt="APDS Landscaping Logo"
                  width={540}
                  height={282}
                  priority
                />
                <div>
                  <p className="font-semibold">Name</p>
                  <p>Brief bio goes here...</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
