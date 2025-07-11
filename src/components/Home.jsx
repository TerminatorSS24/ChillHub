// src/pages/Home.jsx
import React from "react";
import requests from "../requests";
import Row from "../components/Row";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Banner />
      <div className="px-4 space-y-6">
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
        />
      </div>
    </div>
  );
}

export default Home;
