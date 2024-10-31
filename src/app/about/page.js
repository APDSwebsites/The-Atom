"use client";
// pages/about.js
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";

import Image from "next/image";
//var tempPic = new Image();
//var source = "/images/Liz.jpg";
var editorName = "Liz Adams";
var editorBio = "";
var editorPic = "/images/Liz.jpg";
var artistName = "Chris Adams";
var artistBio = "";
var artistPic = "/images/image0.jpeg";
var webDevOneName = "Seth Shuey";
var webDevOneBio = "Seth Shuey is a failed comedian who took up web development as a last resort.";
var webDevOnePic = "/images/APDS-logo.png";
var webDevTwoName = "Peter Massey";
var webDevTwoBio = "Peter Massey is a successful comedian who Seth dragged along with him. He is secretly plotting to make Seth a failed web developer as well. Seth told me to put anything i want for his bio as long as it doesnt include communism or the antichrist";
var webDevTwoPic = "/images/APDS-logo.png";

let people = [
  {name: editorName, bio: editorBio, pic: editorPic},
  {name: artistName, bio: artistBio, pic: artistPic},
  {name: webDevOneName, bio: webDevOneBio, pic: webDevOnePic},
  {name: webDevTwoName, bio: webDevTwoBio, pic: webDevTwoPic}
];
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
        {[people[0], people[1], people[2], people[3]].map(
          (role) => (
            <div key={role.name} className="bg-gray-100 p-4">
              {<h3 className="text-xl font-semibold mb-2">{role.name}</h3>}
              <div className="flex">
                <Image
                  src = {role.pic}
                  //src={editorPic}
                  alt="APDS Landscaping Logo"
                  width={270}
                  height={141}
                  priority
                />
                <div>
                  {/*<p>{role.bio}</p>*/}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
