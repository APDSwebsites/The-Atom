"use client";
// pages/index.js
// app/page.js
import Layout from "../components/Layout";
//const fetch = require('node-fetch');
import { useState, useEffect } from "react";
import Link from "next/link";

//pedantic change

export default function Home() {

  const [articles, setArticle] = useState([]);
  const [fTitle, setFTitle] = useState([]);
  const[titleOne, setTitleOne] = useState([]);
  const[titleTwo, setTitleTwo] = useState([]);
  const[titleThree, setTitleThree] = useState([]);
  //const[fImage, setFImage] = useState([]);
  const[fContentRaw, setFContent] = useState([]);
  const[contentOneRaw, setContentOne] = useState([]);
  const[contentTwoRaw, setContentTwo] = useState([]);
  const[contentThreeRaw, setContentThree] = useState([]);

  

  useEffect(() => {
    // Fetch articles when component mounts
    fetchArticles();
  }, []);

  function getContent(content, index, intent){

    let conType = content[index].type;
    if((conType == "image" && intent == "text")|| (conType == "text" && intent == "image")){
        content = getContent(content, index + 1, intent);
    }
    return content[index];
  }

  const fetchArticles = async () => {
    try {
      const response = await fetch("./api/articles");
      const data = await response.json();
      if (data.success) {
        setArticle(data.data);  
        setFTitle(data.data[0].title);
        setTitleOne(data.data[1].title);
        setTitleTwo(data.data[2].title);
        setTitleThree(data.data[3].title);
        //setFImage(getContent(data.data[0].content, 0, "image"));
        setFContent(getContent(data.data[0].content,0, "text").text);
        setContentOne(getContent(data.data[1].content, 0, "text").text);
        setContentTwo(getContent(data.data[2].content, 0, "text").text);
        setContentThree(getContent(data.data[3].content, 0, "text").text);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  let fContent = fContentRaw.slice(0,400).concat("...");
  let contentOne = contentOneRaw.slice(0, 400).concat("...");
  let contentTwo = contentTwoRaw.slice(0, 400).concat("...");
  let contentThree = contentThreeRaw.slice(0, 400).concat("...");
  let subContent = [{title: titleOne, content: contentOne}, {title: titleTwo, content: contentTwo}, {title: titleThree, content: contentThree}];

  return (
    <Layout>
      {/* <h1></h1> */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4"></h2>
 
          <div className="bg-gray-200 p-4 mb-8">
              <h3 className="text-xl font-semibold">{fTitle}</h3>
              <img
                //src="../placeholder-image.jpg"
                src = "/images/the-atom-header-best.jpg"
                alt=""
                className="w-full h-64 object-cover mb-4"
              />

              <p>
                {fContent}
              </p>
            </div>
            <h2 className="text-2xl font-bold mb-4">Latest Content</h2>
            <div className="space-y-4">
              {[subContent[0], subContent[1], subContent[2]].map((item) => (
                <div key={item} className="bg-gray-100 p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
              
            </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">The atom is funded by readers like you, thank you</h2>
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
// <Link
// href="/admin/manage-articles"
// className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
// >
// <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
// <p className="text-gray-600">
//   Edit, delete, or unpublish existing articles
// </p>
// </Link> 

