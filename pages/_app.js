import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
// import { createContext, useState } from "react";
// import { useEndpointSwitcher } from "../hooks/useEndpointSwitcher";
import { useModalStateSwitcher } from "../hooks/useModalStateSwitcher";
import { store } from "../state";
import { Provider } from "react-redux";

// export const PageNumberContext = createContext({
//   pageNumber: "1",
//   setPageNumber: () => {
//     throw Error("No value");
//   },
// });

export default function MyApp({ Component, pageProps }) {
  // const [pageNumber, setPageNumber] = useState("1");
  // const endpointSwitcher = useEndpointSwitcher();
  const modalStateSwitcher = useModalStateSwitcher();



  return (
    <Provider store={store}>
      <AuthProvider>
        {/* <PageNumberContext.Provider value={{ pageNumber, setPageNumber }}> */}
        <Head />
        <Component
          {...pageProps}
          // {...endpointSwitcher}
          {...modalStateSwitcher}
        />
        {/* </PageNumberContext.Provider> */}
      </AuthProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
