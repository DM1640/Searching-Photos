import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); //第一页
  const [currenSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f917000010000019db3dc9eb5224e32b71b7f9e23cdff7b";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currenSearch}&per_page=15&page=1`;

  // fetch data from pexels API
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseDate = await dataFetch.json();
    setData(parseDate.photos);
  };

  // load more picture
  const morepictures = async () => {
    let newURl;
    if (currenSearch === "") {
      newURl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURl = `https://api.pexels.com/v1/search?query=${currenSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseDate = await dataFetch.json();
    setData(data.concat(parseDate.photos));
  };

  // fetch data when the page loads up
  useEffect(() => {
    search(initialURL);
  }, []);

  useEffect(() => {
    if (currenSearch === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currenSearch]);

  return (
    <div style={{ minHeight: "93vh" }}>
      <Search
        search={() => {
          // JS Closure
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>

      <div className="morePictures">
        <button onClick={morepictures}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
