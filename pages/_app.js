import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import axios from "axios";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// spinner disabled
NProgress.configure({ showSpinner: false });

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// adding global axios baseurl
if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "http://localhost:3000/api";
} else {
  axios.defaults.baseURL = "http://localhost:3000/api";
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
