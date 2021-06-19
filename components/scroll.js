import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

import { ThemeContext } from "../contextAPI/theme";

export default function Scroll() {
  const { isDarkMode } = useContext(ThemeContext);
  const [darkMode, setdarkMode] = isDarkMode;
  const [items, setitems] = useState([]);
  const [page, setpage] = useState(1);
  const [isEnd, setisEnd] = useState(false);

  async function fetchInitialData() {
    try {
      setpage(page + 1);
      const res = await axios.get(`/api/scams/?limit=2&page=${page}`);
      console.log(res);
      setitems([...items, ...res.data]);
    } catch (error) {
      const err = error.response.data;
      alert(err);
    }
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchMoreData() {
    setpage(page + 1);
    const res = await axios.get(`/api/scams/?limit=2&page=${page}`);
    setitems([...items, ...res.data]);
    if (res.data.length === 0) {
      setisEnd(true);
    }
  }

  return (
    <div>
      <p> {darkMode ? "dark mode" : "light mode"} </p>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={!isEnd}
        loader={<div className="loader" />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>all data shown!</b>
          </p>
        }
        scrollThreshold={1}
        className="infinitescroll"
      >
        {items.map((items, index) => (
          <div key={index}>
            <p>{items.title}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
