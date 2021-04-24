import Head from "next/head";
import { Container, useColorMode, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getPosts() {
    try {
      setLoading(true);
      const res = await axios.get("/api/posts");
      console.log(res.data);
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Next Js Blog</title>
      </Head>

      <Container maxW="container.xl">
        <div className="logo">LOGO</div>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {loading ? (
          <>
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
            <Skeleton mt="4" width="40%" height="20px" />
          </>
        ) : (
          <>
            {posts.map((post, index) => (
              <div key={index}>
                <h1 style={{ marginTop: 20 }}> {post.title} </h1>
              </div>
            ))}
          </>
        )}
      </Container>
    </>
  );
}
