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
                <FooterLogo>
                    GoFundYourself
                </FooterLogo>
                <FooterLogoDescription>
                    On the Ξthereum blockchain
                </FooterLogoDescription>
                <FooterLogosCon>
                    <Link href="https://discord.gg/bpgXXn8UcH" passHref>
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

                <FooterLinksCon>
                        <Link href="proposals" passHref>
                            <a target="_blank" rel="noreferrer">
                                Top Rated Proposals
                            </a>
                        </Link>
                        <Link href="proposals" passHref>
                            <a target="_blank" rel="noreferrer">
                                Newest Proposals
                            </a>
                        </Link>
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