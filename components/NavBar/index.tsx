import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { useMoralis } from "react-moralis"
import UserBlockie from "./UserBlockie";
import {
    NavBarCon, NavBarLogo, NavBarConnectWallet
} from "./NavBarElements"
import Logo from "../../assets/Logos/LOGO_gofundyourself.png"
namespace JSX {
    export interface Element {
        div: {[k: string]: any}
    }
  }

function NavBar (): JSX.Element[] | any {
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        user,
        logout
    } = useMoralis();
    return (
        <NavBarCon>
            <NavBarLogo>
                <Image src={Logo} alt="logo" height="70px" width="70px"/>
                GoFundYourself
            </NavBarLogo>
            {isAuthenticated ?
            <Link href="/profile" passHref>
                <NavBarConnectWallet>
                My Profile
                </NavBarConnectWallet>
            </Link>
            :
            <NavBarConnectWallet onClick={() => authenticate({signingMessage:"Welcome to GoFundYourself! Sign in using your Metamask wallet with a gas-less, free transaction to tokenize yourself and others. LFG!"})}>
                Connect Wallet
            </NavBarConnectWallet>
            }

        </NavBarCon>
    )
}

export default NavBar