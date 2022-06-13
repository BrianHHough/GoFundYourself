import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMoralis } from "react-moralis"
import {
    FooterCon, FooterLogoCon, FooterLogo, FooterLogoDescription, FooterLogosCon, FooterLinksCon
} from "./FooterElements"
import DiscordLogo from "../../assets/Logos/discord.png"
import GitHubLogo from "../../assets/Logos/github.png"

namespace JSX {
    export interface Element {
        div: {[k: string]: any}
    }
  }



function NavBar (): JSX.Element[] | any {
    const {
        isAuthenticated,
        isAuthenticating,
        user,
        logout
    } = useMoralis();
    return (
        <FooterCon>
            <FooterLogoCon>
                <div style={{display: "flex"}}>
                <div>
                    <FooterLogo>
                        GoFundYourself
                    </FooterLogo>
                    <FooterLogoDescription>
                        On the Ξthereum blockchain
                    </FooterLogoDescription>
                </div>
                
                <div style={{marginTop: "5px"}}>
                <FooterLogosCon>
                    <Link href="https://discord.gg/RTaEU3bJ" passHref>
                        <a target="_blank" rel="noreferrer">
                            <Image src={DiscordLogo} height="30px" width="30px" alt="Discord logo"/>
                        </a>
                    </Link>
                    &nbsp;
                    <Link href="https://github.com/brianhhough/gofundyourself" passHref>
                        <a target="_blank" rel="noreferrer">
                            <Image src={GitHubLogo} height="30px" width="30px" alt="Discord logo"/>
                        </a>
                    </Link>
                </FooterLogosCon>
                </div>

                </div>

                <FooterLinksCon>
                        <Link href="proposals" passHref>
                            <a target="_blank" rel="noreferrer">
                                Top Rated Proposals
                            </a>
                        </Link>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Link href="proposals" passHref>
                            <a target="_blank" rel="noreferrer">
                                Newest Proposals
                            </a>
                        </Link>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Link href="showcase" passHref>
                            <a target="_blank" rel="noreferrer">
                                Project Showcase
                            </a>
                        </Link>

                </FooterLinksCon>

            </FooterLogoCon>
        </FooterCon>

        
    )
}

export default NavBar
