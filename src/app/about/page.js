"use client";
// pages/about.js
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";

import Image from "next/image";
//var tempPic = new Image();
//var source = "/images/Liz.jpg";
var editorName = "Liz Adams";
var editorBio = "Liz adams is the Editor of the Atom";
var editorPic = "/images/Liz.jpg";
var artistName = "Chris Adams";
var artistBio = "Chirs Adams is the digital artist for the Atom";
var artistPic = "/images/image0.jpeg";
var webDevOneName = "Seth Shuey";
var webDevOneBio = "Seth Shuey is the owner of Abducted Prarie Dog Studio and the head web developer";
var webDevOnePic = "/images/APDS-logo.png";
var webDevTwoName = "Peter Massey";
var webDevTwoBio = "Peter Massey is an employee of Abducted Prarie Dog Studio as a web developer";
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
                  <p>{role.bio}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
