import React from 'react'
import { useMoralis } from "react-moralis"
import UserBlockie from "./UserBlockie";
import {
    NavBarCon, NavBarLogo, NavBarConnectWallet
} from "./NavBarElements"

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
                GoFundYourself
            </NavBarLogo>
            {isAuthenticated ?
            <NavBarConnectWallet onClick={logout}>
            Log out
            </NavBarConnectWallet>
            :
            <NavBarConnectWallet onClick={() => authenticate({signingMessage:"Welcome to GoFundYourself! Sign in using your Metamask wallet with a gas-less, free transaction to tokenize yourself and others. LFG!"})}>
                Connect Wallet
            </NavBarConnectWallet>
            }

        </NavBarCon>
    )
}

export default NavBar