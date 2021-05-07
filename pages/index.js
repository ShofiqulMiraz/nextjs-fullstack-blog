import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  useColorMode,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";
import SkeletonComponentForPost from "../components/skeleton";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getPosts() {
    try {
      const res = await axios.get(`/posts?limit=10`);
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
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
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>

        {loading && <SkeletonComponentForPost number={10} />}

        {posts.map((post, index) => (
          <div key={index}>
            <Box
              w="100%"
              p={4}
              mt={3}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Heading as="h4" size="md">
                {post.title}
              </Heading>
              <Link href={`/posts/${post.slug}`}>
                <a>read more</a>
              </Link>
            </Box>
          </div>
        ))}
      </Container>
    </>
  );
}
