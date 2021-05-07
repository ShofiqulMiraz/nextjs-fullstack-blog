import axios from "axios";
import Head from "next/head";
import Link from "next/link";

export default function PostBySlugComponent({ post }) {
  console.log(post);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <p> {post.description} </p>
      <Link href="/">
        <a>go home</a>
      </Link>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/posts/${params.slug}`);
  const post = response.data[0];
  if (!post) {
    return {
      notFound: true,
    };
  }
  return { props: { post } };
}
