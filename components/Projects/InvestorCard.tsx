import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { useMoralis } from "react-moralis"
import {  
    ProjectCardCon, ProjectCardImage, PercentComplete, ProjectCardViewButton
} from "./ProjectElements"
import { styled } from '@mui/material/styles';

import LinearProgress, { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { stepClasses } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EthereumLogo from "../../assets/Logos/ethereum.png"
import ChainlinkHorizontal from "../../assets/Logos/chainlink-horizontal.jpeg"

namespace JSX {
    export interface Element {
        div: {[k: string]: any}
    }
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 32,
    borderRadius: 20,
    transform: "translateX(55%)",
    border: "4px solid black",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#ffffff',
      
    },
    [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 5,
      background: 'linear-gradient(90deg, #03FCBA, #ffffff)',
    },
  }));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
return (
    <>
        <Box sx={{ display: 'flex', alignItems: 'center', width: "50%" }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <div style={{
                display: "flex",
                left: "50%",
                transform: "translateX(15%)",
                position: "relative"
            }}>
            <div style={{position: "relative", marginRight: "5px"}}>
                <Image src={EthereumLogo} alt="ethereum" height="40" width="25"/>
            </div>
            <h1 style={{position: "relative", marginTop: "0px" }}>
                {`${(props.value).toFixed(3)}`} 
            </h1>
            </div>
        </Box>
        
        </Box>
        <PercentComplete style={{marginTop: "-10px"}}>
            <div>
                <span style={{fontWeight: "700", marginRight: "10px"}}>($24,000 USD)</span>
                <PercentComplete>
            
            funding given
        </PercentComplete>
                <div style={{
                    display: "flex",
                    left: "50%",
                    transform: "translateX(-25%)",
                    position: "relative",
                    marginTop: "20px"
                    }}>
                    Powered by: 
                    <div style={{width: "90px", marginLeft: "10px", marginTop: "-3px"}}>
                        {/* DEWORK BOUNTY CHAINLINK PRICE FEED INTEGRATION */}
                    <Image 
                        src={ChainlinkHorizontal} 
                        alt="Chainlink"
                        objectFit="contain"
                    />
                    </div>
                </div>
            </div>
        </PercentComplete>
        
    </>
);
}

function InvestorCard (
    {pfp, name, status, link}: 
    {pfp: any, name: string, status: number, link: string}
    ): JSX.Element[] | any {
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        user,
        logout
    } = useMoralis();

    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
        <>
        <ProjectCardCon>
            <div style={{left: "50%", transform: "translateX(-50%)", position: "relative", background: "#00FCB9", width: "130px", height: "130px", borderRadius: "360px", marginTop: "20px"}}>
                <ProjectCardImage
                    src={pfp}
                    height={130}
                    width={130}
                >
                </ProjectCardImage>
            </div>

            <div style={{width: "100%", textAlign: "center", marginTop: "10px", marginBottom: "10px", fontSize: "16pt"}}>
                {name}
            </div>

            <Box >
                <LinearProgressWithLabel 
                    value={status} 
                />
            </Box>

    <Link href={`${link}`} passHref>
        <a target="_blank" rel="noreferrer">
            <ProjectCardViewButton style={{marginBottom: "20px"}}>
                <div style={{
                    display: "flex",
                    textAlign: "center",
                    left: "50%",
                    transform: "translateX(5%)"
                    }}>
                <div style={{
                    top: "50%",
                    transform: "translateY(15%)"
                }}>
                    View Profile 
                </div>
                <ArrowForwardIcon style={{
                    fontWeight: "100"
                }} />
                </div>
            </ProjectCardViewButton>
        </a>
    </Link>

    </ProjectCardCon> 
    </>
    )
}

export default InvestorCard