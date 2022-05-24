import React from 'react'
import { useMoralis } from "react-moralis"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

namespace JSX {
    export interface Element {
        div: {[k: string]: any}
    }
  }

export default function Layout({children}: {children: any}): JSX.Element[] | any {
    const { 
      isAuthenticated, 
    } = useMoralis();

    if(isAuthenticated) {
    return (
      <>
        <NavBar/>
          {children}
        <Footer/>
      </>
      )
    }

    if(!isAuthenticated) {
    return (
      <>
        <NavBar/>
          {children}
        <Footer/>
      </>
    )
    }
}