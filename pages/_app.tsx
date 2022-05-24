import React from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Provider from "../hooks/Web3Context";
import { MoralisProvider } from "react-moralis";
import Layout from "../components/Layout"


function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  if (!process.env.NEXT_PUBLIC_MORALIS_APP_ID || !process.env.NEXT_PUBLIC_MORALIS_SERVER_URL) {
    return (
      <>
        <h1>Dapp server not configured correctly</h1>
        <h3>Consult a dev on the team for support</h3>
      </>
    )
  }

  return (
    <>
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID || ""} 
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL || ""}
      initializeOnMount={true}
    >
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </MoralisProvider>
    </>
    )
}

export default MyApp;
