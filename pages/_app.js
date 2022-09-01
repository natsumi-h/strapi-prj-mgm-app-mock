import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
