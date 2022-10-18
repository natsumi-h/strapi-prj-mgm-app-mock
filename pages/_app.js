import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { createContext, useState } from "react";
import { useEndpointSwitcher } from "../hooks/useEndpointSwitcher";

export const PageNumberContext = createContext({
  pageNumber: "1",
  setPageNumber: () => {
    throw Error("No value");
  },
});

export default function MyApp({ Component, pageProps }) {
  const [pageNumber, setPageNumber] = useState("1");
  const endpointSwitcher = useEndpointSwitcher();

  return (
    <AuthProvider>
      <PageNumberContext.Provider value={{ pageNumber, setPageNumber }}>
        <Head />
        <Component {...pageProps} {...endpointSwitcher} />
      </PageNumberContext.Provider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
